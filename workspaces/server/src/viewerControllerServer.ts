/* eslint-disable no-param-reassign */
import WS from 'ws';
import http from 'http';
import { Player, LogLevel, LoggerClass, constants, env } from 'fuku.tv-shared';
import fetch from 'node-fetch';

import * as redis from 'redis';

const logger = new LoggerClass('viewerServer');

const uriController = 'ws://96.61.12.109';

const portController = 10777;

const FUKU_REDIS_URL = env.fukuRedisServerURL();

// hack to map authenticated email to current player
const userRequestMap = new WeakMap();

export class ControllerServer {
  queue: any[] = [];

  players: Player[] = [];

  currentPlayer: Player = null;

  watchCounter = 0;

  queueCounter = 0;

  clientController: any;

  clientVideo1: any;

  clientVideo2: any;

  serial: any;

  wss: WS.Server;

  redisClient: any = redis.createClient(6379, FUKU_REDIS_URL);

  progressiveJackpot = 1000;

  constructor(server: http.Server) {
    this.connectController();

    this.redisClient.on('connect', () => {
      logger.log(LogLevel.info, 'Redis connected');
      this.redisClient.flushdb();
    });

    // client->us
    this.wss = new WS.Server({
      server,
    });

    this.wss.on('connection', (socket: any, req: any) => {
      const clientPlayer = new Player(
        socket,
        this.players.length + 1,
        this.queue.length,
        800,
        480,
        req.headers['x-forwarded-for'] || req.socket.remoteAddress
      );
      logger.log(LogLevel.info, `${clientPlayer.ipAddr} - socket open. id: ${clientPlayer.uid}`);
      this.players.push(clientPlayer);

      socket.on('message', async (data: any) => {
        const msg = JSON.parse(data);
        console.log('Socket Message Received', msg);

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
            console.log('Starting Queue');

            clientPlayer.Login(await authenticateConnection(msg.message));
            this.queuePlayer(clientPlayer);
            break;
          case constants.PlayerCommand.dequeue:
            this.dequeuePlayer(clientPlayer);
            break;
          case constants.PlayerCommand.login:
            clientPlayer.Login(await authenticateConnection(msg.message));
            break;
          case constants.PlayerCommand.logout:
            clientPlayer.logout();
            break;
          case constants.PlayerCommand.chatjoin:
            console.log('User joined. Getting ready to send all messages out ');
            // this.sendAllChatMessages();
            // get all previous stored messages
            // use forLoop to send out each messages
            break;
          case constants.PlayerCommand.chatmsg:
            // filter stupid shit
            // put it in redis

            if (this.redisClient.lpush('room:main', msg.chatmessage) > 10) {
              this.redisClient.rpop('room:main');
            }
            console.log('about to send back', clientPlayer);

            sendall(this.players, {
              command: constants.PlayerCommand.chatmsg,
              user: 'clientPlayer.userdata.nickname',
              chatmessage: msg.chatmessage,
            });
            break;
          default:
            break;
        }
      });

      // close always gets called after error
      socket.on('error', (err: any) => {
        logger.log(LogLevel.info, `${clientPlayer.ipAddr} - socket error ${err}`);
      });

      socket.on('close', () => {
        logger.log(LogLevel.info, `${clientPlayer.ipAddr} - socket closed`);
        this.players.forEach((p, i) => {
          if (p === clientPlayer) {
            this.dequeuePlayer(p);
            this.deactivatePlayer(p);
            this.players.splice(i, 1);
          }
        });
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

          if (pointsPct === 0) pointsWon = 1;
          // womp womp
          else if (pointsPct > 0 && pointsPct <= 10) pointsWon = 2;
          else if (pointsPct > 10 && pointsPct <= 25) pointsWon = 3;
          else if (pointsPct > 25 && pointsPct <= 50) pointsWon = 4;
          else if (pointsPct > 50 && pointsPct <= 75) pointsWon = 5;
          else if (pointsPct > 75) {
            if (pointsPct === 100) {
              if (Math.floor(Math.random() * Math.floor(100)) === 100) {
                // you just won the jackpot
                jackpot = true;
              }
            }
            if (Math.floor(Math.random() * Math.floor(100)) > 75) pointsWon = 10;
            else pointsWon = 6;
          }
          this.currentPlayer.send({ command: constants.PlayerCommand.prizeget, points: pointsWon, jackpot });
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
      p.updateGameStats(this.queue.length, this.players.length);
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

  playStart() {
    if (this.currentPlayer.credits === 0) return;

    // set the claw to a default position so timeouts, etc work
    this.resetClaw();

    // Unlock player controls
    this.currentPlayer.play(this.playEnd.bind(this));
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

    if (this.currentPlayer === null && this.queue.length > 0) {
      this.activatePlayer(this.queue.shift());
    }
  }

  activatePlayer(p: any) {
    logger.log(LogLevel.info, `${p.uid} - activatePlayer`);
    this.gameEnd();
    this.currentPlayer = p;
    this.dequeuePlayer(p);
    this.currentPlayer.gameState = constants.GameState.standby;
    this.currentPlayer.standby(() => {
      this.deactivatePlayer(this.currentPlayer);
    });
  }

  deactivatePlayer(p: any) {
    logger.log(LogLevel.info, `${p.uid} - deactivatePlayer`);
    if (this.currentPlayer !== null && this.currentPlayer !== undefined) {
      if (this.currentPlayer !== p) {
        logger.log(LogLevel.info, `${p.uid} - bad player!`);
        return;
      }
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
    if (!this.queue.includes(p)) {
      this.queue.push(p);
      p.send({ command: constants.PlayerCommand.queue, success: true });
      logger.log(LogLevel.info, `${p.uid} - player queued`);
      this.updateallstats();
    } else {
      p.send({ command: constants.PlayerCommand.queue, success: false });
      logger.log(LogLevel.info, `${p.uid} - player already queued`);
    }
  }

  dequeuePlayer(p: Player): void {
    logger.log(LogLevel.info, `${p.uid} - dequeue`);
    this.queue.forEach((item, index, object) => {
      if (item === p) {
        object.splice(index, 1);
        logger.log(LogLevel.info, `player dequeue - ${p.uid}`);
      }
      this.updateallstats();
    });
    p.send({ action: constants.PlayerCommand.dequeue, success: true });
  }

  updateallstats() {
    console.log('Starting updating all stats');

    this.players.forEach((p) => {
      p.updateGameStats(this.queue.length, this.players.length);
    });
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
    const res = await fetch('https://fukutv-alpha.us.auth0.com/userinfo', {
      method: 'get',
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    const data = await res.json();

    logger.log(LogLevel.info, `Validated user: ${data.email} ${data.nickname}`);
    return { email: data.email, nickname: data.nickname };
  } catch (err) {
    logger.log(LogLevel.error, `Login Error: ${err}`);
    return null;
  }
};

export default ControllerServer;
