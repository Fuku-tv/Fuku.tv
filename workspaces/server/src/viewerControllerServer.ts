/* eslint-disable no-param-reassign */
import WS from 'ws';
import http from 'http';
import { Player, LogLevel, LoggerClass, constants } from 'fuku.tv-shared';
import url from 'url';
import querystring from 'querystring';
import fetch from 'node-fetch';
import * as redis from 'redis';

const logger = new LoggerClass('viewerServer');

const uriController = 'ws://96.61.12.109';

const portController = 10777;

// hack to map authenticated email to current player
const userRequestMap = new WeakMap();

export class ControllerServer {
  queue: any[] = [];

  players: Player[] = [];

  currentPlayer: Player = null;

  watchCounter: number = 0;

  queueCounter: number = 0;

  clientController: any;

  clientVideo1: any;

  clientVideo2: any;

  serial: any;

  wss: WS.Server;

  redisClient: any = redis.createClient(6379, '127.0.0.1');

  progressiveJackpot: number = 1000;

  constructor(server: http.Server) {
    this.connectController();

    this.redisClient.on('connect', () => {
      logger.log(LogLevel.info, 'Redis connected');
      this.redisClient.flushdb();
    });

    // client->us
    this.wss = new WS.Server({
      server,
      verifyClient: async (info: any, authenticated: any) => {
        const userdata = await authenticateConnection(info);
        if (userdata === null || userdata === undefined) {
          authenticated(false);
        } else {
          userRequestMap.set(info.req, userdata);
          authenticated(true);
        }
      },
    });

    this.wss.on('connection', (socket: any, req: any) => {
      const userdata = userRequestMap.get(req);
      logger.log(LogLevel.info, `got userdata for ${userdata.nickname}`);
      const clientPlayer = new Player(
        userdata,
        socket,
        this.players.length + 1,
        this.queue.length,
        800,
        480,
        req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      );
      logger.log(LogLevel.info, `${clientPlayer.ipAddr} - socket open. id: ${clientPlayer.uid}`);
      this.players.push(clientPlayer);

      socket.on('message', (data: any) => {
        const msg = JSON.parse(data);

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
            break;
          case constants.PlayerCommand.dequeue:
            this.dequeuePlayer(clientPlayer);
            break;
          case constants.PlayerCommand.login:
            break;
          case constants.PlayerCommand.logout:
            break;
          case constants.PlayerCommand.chatmsg:
            // filter stupid shit
            // put it in redis
            if (this.redisClient.lpush('room:main', msg.chatmessage) > 10) {
              this.redisClient.rpop('room:main');
            }
            sendall(this.players, { command: constants.PlayerCommand.chatmsg, nickname: clientPlayer.userdata.nickname, chatmessage: msg.chatmessage });
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
/*
    setInterval(() => {
      this.checkPlayerQueue();
    }, 500);
    setInterval(() => {
      this.updateGameStats();
    }, 1000);
*/
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
      switch (msg.command) {
        case constants.PlayerCommand.prizeget:
          // player scored a prize
          if (this.currentPlayer === null || this.currentPlayer === undefined) {
            logger.log(LogLevel.info, 'prizeget but currentPlayer deref!');
            return;
          }
          var pointsPct = Math.floor(Math.random() * Math.floor(100))
          var pointsWon = 0;
          var jackpot = false;
          if (pointsPct === 0) pointsWon = 1; // womp womp
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
          this.currentPlayer.send({ command: constants.PlayerCommand.prizeget, points: pointsWon, jackpot: jackpot });
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
    if (this.currentPlayer !== null && this.currentPlayer !== undefined)
      this.currentPlayer.gameEnd();
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

  queuePlayer(p: any): void {
    if (this.currentPlayer !== null && this.currentPlayer !== undefined)
      if (this.currentPlayer === p)
        return; // what are you even trying to accomplish?
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
}

const authenticateConnection = async (info: { origin: string; secure: boolean; req: http.IncomingMessage }): Promise<any> => {
  // parse querystring for token
  const parsedUrl = url.parse(info.req.url);
  const parsedQs = querystring.parse(parsedUrl.query);
  const { token } = parsedQs;

  // check if querystring for token exists
  if (token === null || token === undefined) {
    logger.log(LogLevel.info, `${info.req.socket.remoteAddress} - Got message but no token?`);
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
