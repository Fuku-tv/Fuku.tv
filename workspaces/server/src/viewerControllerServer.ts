/* eslint-disable no-param-reassign */
import WS from 'ws';
import type http from 'http';
import { Player, LogLevel, LoggerClass, constants, env } from 'fuku.tv-shared';
import axios from 'axios';
import type { WebhookClient } from 'fuku.tv-shared/discord';
import { getDiscordClient, getWebhookClient, getDebugWebhookClient } from 'fuku.tv-shared/discord';
import { playersTableModel } from 'fuku.tv-shared/dynamodb/table';
import { redisPublisher, redisSubscriber } from './common/redis';
import WebsocketServerBase from './websocketServerBase';

import queuePublisher from './common/redis/queue/queuePublisher';

import queueSubscriber from './common/redis/queue/queueSubscriber';

const logger = new LoggerClass('viewerServer');

const uriController = 'ws://96.61.12.109';

const portController = 10777;

let webhookClient: WebhookClient;
let debugWebhookClient: WebhookClient;
getWebhookClient()
  .then((client) => {
    webhookClient = client;
  })
  .catch();

getDebugWebhookClient()
  .then((client) => {
    debugWebhookClient = client;
  })
  .catch();

export class ControllerServer extends WebsocketServerBase {
  queue: string[] = [];

  players: Player[] = [];

  currentPlayer: Player = null;

  clientController: WS;

  progressiveJackpot = 10000;

  creditsMultiplier = 100;

  async run(): Promise<void> {
    this.connectController();

    redisSubscriber.on('connect', () => {
      logger.log(LogLevel.info, 'redisSubscriber connected');
    });

    redisPublisher.on('connect', () => {
      logger.log(LogLevel.info, 'redisPublisher connected');
    });

    redisSubscriber.on('message', (channel, data: any) => {
      const { message } = JSON.parse(data);

      if (message.username === 'Fuku-tv Bot') {
        return;
      }

      sendall(this.players, {
        command: constants.PlayerCommand.chatmsg,
        user: message.username,
        chatmessage: message.chatmessage,
      });
    });
    queueSubscriber.onMessage((data) => {
      console.log('queue message: ', { data });
      const { message } = JSON.parse(data);
      queuePublisher.publish(message.queue);
    });
    queueSubscriber.subscribe();
    redisSubscriber.subscribe('chatmessage');

    this.wss.on('connection', (socket: any, req: any) => {
      const clientPlayer = new Player(socket, req.headers['x-forwarded-for'] || req.socket.remoteAddress);
      // logger.log(LogLevel.info, `${clientPlayer.ipAddr} - socket open. id: ${clientPlayer.uid}`);
      logger.log(LogLevel.info, `${clientPlayer.ipAddr} - socket open.`);
      clientPlayer.send({
        command: constants.PlayerCommand.chatmsg,
        user: 'System Message',
        chatmessage: 'Welcome to Fuku! You can join us on Discord @ https://discord.gg/sPDYSPFDYa',
      });
      this.players.push(clientPlayer);
      this.updateGameStats();

      socket.on('message', async (data: any) => {
        const msg = JSON.parse(data);
        console.log('Socket Message Received', msg);
        const { credits } = msg;
        const points = credits * this.creditsMultiplier;

        switch (msg.command) {
          case constants.PlayerCommand.control:
            if (this.currentPlayer === null || this.currentPlayer === undefined) {
              logger.log(LogLevel.info, `${clientPlayer.uid} - Got control message but currentPlayer deref`);
              break;
            }
            if (clientPlayer !== this.currentPlayer) break;
            switch (this.currentPlayer.gameState) {
              case constants.GameState.standby:
                if (msg.button === constants.Button.start) this.playStart();
                else if (msg.button === constants.Button.stop) this.deactivatePlayer(this.currentPlayer);
                break;
              case constants.GameState.playing:
                if (msg.button === constants.Button.drop && msg.action === constants.Action.start) this.playEnd();
                else if (msg.action === constants.Action.start)
                  send(this.clientController, { command: constants.ControllerCommand.buttonstart, button: msg.button });
                else if (msg.action === constants.Action.stop)
                  send(this.clientController, { command: constants.ControllerCommand.buttonstop, button: msg.button });
                break;
              default:
                logger.log(LogLevel.error, `${clientPlayer.uid} - sent control message, but no valid playstate: ${this.currentPlayer.gameState}`);
                break;
            }
            break;
          case constants.PlayerCommand.queue:
            this.queuePlayer(clientPlayer);
            this.updateGameStats();
            break;
          case constants.PlayerCommand.dequeue:
            this.dequeuePlayer(clientPlayer);
            this.updateGameStats();
            break;
          case constants.PlayerCommand.login:
            clientPlayer.Login(await authenticateConnection(msg.message), this.queue.length, this.players.length, 800, 480);
            break;
          case constants.PlayerCommand.logout:
            clientPlayer.logout();
            break;
          case constants.PlayerCommand.chatjoin:
            break;
          case constants.PlayerCommand.chatmsg:
            redisPublisher.publish(
              'discordmessage',
              JSON.stringify({
                message: { username: clientPlayer.userdata.nickname, chatmessage: msg.chatmessage, pictureUrl: clientPlayer.userdata.pictureUrl },
              }),
              () => {}
            );
            break;
          case constants.PlayerCommand.pointsredeem:
            if (points <= 0) {
              logger.log(LogLevel.info, `${clientPlayer.uid} - sent points redeem but didn't redeem enough for credits!`);
              break;
            }
            clientPlayer.redeemPoints(points, credits);
            this.updateGameStats();
            break;
          default:
            break;
        }
      });

      // close always gets called after error
      socket.on('error', (err: any) => {
        logger.log(LogLevel.info, `${clientPlayer.ipAddr} - socket error ${err}`);
      });

      socket.on('close', (msg: any) => {
        logger.log(LogLevel.info, `${clientPlayer.ipAddr} - socket closed ${msg}`);
        this.players.forEach((p, i) => {
          if (p === clientPlayer) {
            this.dequeuePlayer(p);
            this.deactivatePlayer(p);
            this.players.splice(i, 1);
          }
        });
        this.updateGameStats();
      });
    });
  }

  connectController() {
    // us->controller
    logger.log(LogLevel.info, `Connecting controller ${uriController}:${portController}`);

    this.clientController = new WS(`${uriController}:${portController}`);

    this.clientController.on('open', () => {
      logger.log(LogLevel.info, 'clientController open');
    });

    this.clientController.on('message', (data: any) => {
      const msg = JSON.parse(data);
      const pointsPct = Math.floor(Math.random() * Math.floor(100));
      let pointsWon = 0;
      let jackpot = false;
      switch (msg.command) {
        case constants.PlayerCommand.prizeget:
          // player scored a prize
          if (this.currentPlayer === null || this.currentPlayer === undefined) {
            logger.log(LogLevel.info, 'prizeget but currentPlayer deref!');
            return;
          }

          if (pointsPct === 0) pointsWon = 10;
          else if (pointsPct > 0 && pointsPct <= 10) pointsWon = 20;
          else if (pointsPct > 10 && pointsPct <= 25) pointsWon = 30;
          else if (pointsPct > 25 && pointsPct <= 50) pointsWon = 40;
          else if (pointsPct > 50 && pointsPct <= 75) pointsWon = 50;
          else if (pointsPct > 75) {
            if (pointsPct === 100) {
              if (Math.floor(Math.random() * Math.floor(100)) === 100) {
                // you just won the jackpot
                jackpot = true;
              }
            }
            if (Math.floor(Math.random() * Math.floor(100)) > 75) pointsWon = 100;
            else pointsWon = 50;
          }
          if (this.currentPlayer.userdata.nickname === undefined) {
            const email = this.currentPlayer.userdata.email.split('@')[0];
            this.currentPlayer.userdata.nickname = email;
          }
          redisPublisher.publish(
            'prizemessage',
            JSON.stringify({ message: { username: this.currentPlayer.userdata.nickname, points: pointsWon, jackpot } }),
            () => {}
          );
          this.currentPlayer.send({
            command: constants.PlayerCommand.prizeget,
            points: this.currentPlayer.points + pointsWon,
            pointswon: pointsWon,
            jackpot,
          });
          this.currentPlayer.addPoints(pointsWon);
          logger.log(LogLevel.info, `${this.currentPlayer.uid} - prizeget, ${pointsWon} points`);
          break;
        default:
          break;
      }
    });
    this.clientController.on('error', (err: any) => {
      logger.log(LogLevel.info, `clientController error ${err}`);
    });
    this.clientController.on('close', () => {
      logger.log(LogLevel.info, 'clientController closed');
      setTimeout(() => {
        logger.log(LogLevel.info, 'attempting reconnect');
        this.clientController = null;
        this.connectController();
      });
    });
  }

  updateGameStats() {
    this.players.forEach((p) => {
      const currentlyPlaying = this.currentPlayer?.userdata.email.split('@')[0] && null;
      p.updateGameStats(this.queue.length, this.players.length, currentlyPlaying);
    });
  }

  standby() {
    if (this.currentPlayer === null || this.currentPlayer === undefined) {
      logger.log(LogLevel.info, 'standby(): this.currentPlayer deref');
      return;
    }
    this.currentPlayer.standby(() => {
      this.deactivatePlayer(this.currentPlayer);
    });
  }

  // forces machine to drop the claw and reset to home
  resetClaw() {
    send(this.clientController, { command: constants.ControllerCommand.resetclaw });
  }

  // player spends credits/freeplay/points to play the game
  playStart() {
    playersTableModel.get(this.currentPlayer.userdata.email).then((player) => {
      this.currentPlayer.credits = player.credits;
      this.currentPlayer.freeplay = player.freeplay;
      this.currentPlayer.points = player.points;
      if (player.credits === 0 && player.freeplay === 0 && player.points < 200) {
        debugWebhookClient.send(
          `Player ${player.nickname} has insufficent funds to play, credits: ${player.credits}, freeplay:${player.freeplay}, points:${player.points} `
        );
        return;
      }
      debugWebhookClient.send(
        `Player ${player.nickname} is currently playing the game, credits: ${player.credits}, freeplay:${player.freeplay}, points:${player.points} `
      );
      // set the claw to a default position so timeouts, etc work
      this.resetClaw();
      // Unlock player controls
      this.currentPlayer.play(this.playEnd.bind(this));
      this.currentPlayer.updateGameStats(this.queue.length, this.players.length, this.currentPlayer.userdata.email.split('@')[0]);
      sendall(this.players, {
        command: constants.GameState.playing,
        player: this.currentPlayer.userdata.email.split('@')[0],
      });
    });
  }

  playEnd() {
    if (this.currentPlayer === null || this.currentPlayer === undefined) {
      logger.log(LogLevel.info, 'playEnd(): this.currentPlayer deref');
      return;
    }
    this.currentPlayer.playEnd();

    // Waiting long enough for the claw to pick up the prize, return to home,
    // drop the prize, and reset for next play
    setTimeout(() => {
      this.standby();
    }, 6000);

    this.resetClaw();
  }

  gameEnd() {
    if (this.currentPlayer !== null && this.currentPlayer !== undefined) this.currentPlayer.gameEnd();

    this.currentPlayer = null;
    this.resetClaw();

    if (this.queue === null || this.queue === undefined) {
      logger.log(LogLevel.error, 'queue does not exist!');
      return;
    }

    sendall(this.players, {
      command: constants.GameState.playing,
      player: '',
    });

    if (this.currentPlayer === null && this.queue.length > 0) {
      const uid = this.queue.shift();

      this.activatePlayer(this.players.find((x) => x.uid === uid));
      queuePublisher
        .setQueue(this.queue)
        .then()
        .catch((error) => {
          logger.log(LogLevel.error, `queuePublisher error ${error}`);
        });
    }
  }

  activatePlayer(p: Player) {
    logger.log(LogLevel.info, `${p.uid} - activatePlayer`);
    this.gameEnd();
    this.currentPlayer = p;
    this.dequeuePlayer(p);
    this.currentPlayer.gameState = constants.GameState.standby;
    this.currentPlayer.standby(() => {
      this.deactivatePlayer(this.currentPlayer);
    });
  }

  deactivatePlayer(p: Player) {
    logger.log(LogLevel.info, `${p.uid} - deactivatePlayer`);
    if (this.currentPlayer !== null && this.currentPlayer !== undefined) {
      if (this.currentPlayer !== p) {
        logger.log(LogLevel.info, `${p.uid} - bad player!`);
        return;
      }
      debugWebhookClient.send(
        `Player ${this.currentPlayer.uid} has stopped playing the game, credits: ${this.currentPlayer.credits}, freeplay:${this.currentPlayer.freeplay}, points:${this.currentPlayer.points} `
      );
      this.gameEnd();
    }
  }

  queuePlayer(p: Player): void {
    logger.logInfo('queue started');
    if (this.currentPlayer !== null && this.currentPlayer !== undefined) if (this.currentPlayer === p) return; // what are you even trying to accomplish?
    if (!p.isLoggedIn) {
      logger.log(LogLevel.error, `${p.uid} - player is not signed in, please login to enter a fuku queue`);
      return;
    }
    logger.log(LogLevel.info, `${p.uid} - Queue`);
    if (!this.queue.includes(p.uid)) {
      this.queue.push(p.uid);
      webhookClient.send(`Player ${p.userdata.nickname} has entered the queue`, { username: 'Fuku.tv Bot' });
      debugWebhookClient.send(`Player ${p.userdata.nickname} has entered the queue`);
      queuePublisher
        .setQueue(this.queue)
        .then()
        .catch((error) => {
          logger.log(LogLevel.error, `queuePublisher error ${error}`);
        });
      p.send({ command: constants.PlayerCommand.queue, success: true });
      logger.log(LogLevel.info, `${p.uid} - player queued`);
      if (this.currentPlayer === null && this.queue.length === 1) {
        logger.log(LogLevel.info, `${p.uid} - only player in queue, activating!`);
        this.activatePlayer(p);
      }
    } else {
      p.send({ command: constants.PlayerCommand.queue, success: false });
      logger.log(LogLevel.info, `${p.uid} - player already queued`);
    }
  }

  dequeuePlayer(p: Player): void {
    logger.log(LogLevel.info, `${p.uid} - dequeue`);
    // webhookClient.send(`Player ${p?.userdata?.nickname} has exited the queue`, { username: 'Fuku.tv Bot' });
    this.queue.forEach((item, index, object) => {
      if (item === p.uid) {
        object.splice(index, 1);
        logger.log(LogLevel.info, `player dequeue - ${p.uid}`);
        // webhookClient.send(`Player ${p?.userdata?.nickname} has exited the queue`, { username: 'Fuku.tv Bot' });
      }
    });
    p.send({ action: constants.PlayerCommand.dequeue, success: true });
  }
}

const send = (socket: WS, data: any) => {
  if (socket !== null && socket !== undefined) socket.send(JSON.stringify(data));
};

const sendall = (players: Player[], data: any) => {
  players.forEach((p) => {
    if (p.socket !== null && p.socket !== undefined) p.socket.send(JSON.stringify(data));
  });
};

const authenticateConnection = async (token: string): Promise<any> => {
  // check if querystring for token exists
  if (token === null || token === undefined) {
    logger.log(LogLevel.info, ' - Got message but no token?');
    return null;
  }

  // pass token to auth0 for validation
  try {
    const res = await axios.get('https://fukutv-alpha.us.auth0.com/userinfo', {
      method: 'get',
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    const data = await res.data;

    logger.log(LogLevel.info, `Validated user: ${data.email} ${data.nickname}`);
    return { email: data.email, nickname: data.nickname, pictureUrl: data.picture };
  } catch (err) {
    logger.log(LogLevel.error, `Login Error: ${err}`);
    return null;
  }
};

export default ControllerServer;
