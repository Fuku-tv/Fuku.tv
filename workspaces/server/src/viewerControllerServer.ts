import fs from 'fs';
import { MongoClient } from 'mongodb';
import ws from 'ws';
import https from 'https';
import fetch from 'node-fetch';
import { player } from 'fuku.tv-shared';
import { LogLevel, LoggerClass } from 'fuku.tv-shared';
import { constants } from 'fuku.tv-shared';

//const config = require('/etc/fuku/config/global.json');
const logger = new LoggerClass('viewerControllerServer');
//const mongouri = 'mongodb://localhost:27017/';

// var privateKey = fs.readFileSync(config.sslpath + 'privkey.pem', 'utf8');
// var certificate = fs.readFileSync(config.sslpath + 'fullchain.pem', 'utf8');
// var credentials = {
//   key: privateKey,
//   cert: certificate,
// };

const httpsServer = https.createServer();
httpsServer.listen(10888);

const uriController = 'ws://96.61.12.109';

const portController = 10777;

class server {
  queue: any[];
  players: any[];
  currentPlayer: any;
  watchCounter: number;
  queueCounter: number;
  db: any;
  mongo: any;
  clientController: any;
  clientVideo1: any;
  clientVideo2: any;
  wss: any;

  constructor() {
    this.queue = [];
    this.players = [];
    this.currentPlayer = null;
    this.watchCounter = 0;
    this.queueCounter = 0;
    this.db = null;
    /*
    this.mongo = MongoClient.connect(mongouri, (err: any) => {
      if (err) {
        logger.log(LogLevel.error, 'Failed to connect to mongo. ' + err);
        return process.exit(1);
      }
      this.db = this.mongo.db('fukutv');
    });
*/
    this.connectController();

    // client->us
    this.wss = new ws.Server({ server: httpsServer });

    this.wss.on('connection', (socket: any, req: any) => {
      var clientPlayer = new player(socket, this.players.length + 1, this.queue.length, 800, 480, req.connection.remoteAddress);
      logger.log(LogLevel.info, clientPlayer.ipAddr + ' - socket open. id: ' + clientPlayer.uid);
      this.players.push(clientPlayer);
      socket.player = clientPlayer;

      socket.on('message', (data: any) => {
        var msg = JSON.parse(data);
        /*
        if (data.token === null || data.token === undefined) {
          logger.log(LogLevel.info, clientPlayer.uid + ' - Got message but no token?');
          return;
        }
        /*
        if (clientPlayer.isLoggedIn === false) {
          fetch('https://fukutv-alpha.us.auth0.com/userinfo', {
            method: 'get',
            headers: new Headers({
              'Authorization': 'bearer ' + data.token
            })
          }).then((res) => {
            logger.log(LogLevel.info, 'token response: ' + res);
          });
        }*/
        switch (msg.command) {
          case constants.PlayerCommand.control:
            if (this.currentPlayer === null || this.currentPlayer === undefined) {
              logger.log(LogLevel.info, clientPlayer.uid + ' - Got control message but currentPlayer deref');
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
                else {
                  if (msg.action === constants.Action.start)
                    this.send(this.clientController, { command: constants.ControllerCommand.buttonstart, button: msg.button });
                  else if (msg.action === constants.Action.stop)
                    this.send(this.clientController, { command: constants.ControllerCommand.buttonstop, button: msg.button });
                }
                break;
              default:
                logger.log(LogLevel.error, clientPlayer.uid + ' - sent control message, but no valid playstate: ' + this.currentPlayer.gameState);
                break;
            }
            break;
          case constants.PlayerCommand.queue:
            this.queuePlayer(socket.player);
            break;
          case constants.PlayerCommand.dequeue:
            this.dequeuePlayer(socket.player);
          case constants.PlayerCommand.login:
            break;
          case constants.PlayerCommand.logout:
            break;
          case constants.PlayerCommand.prizeget:
            this.send(socket, { command: constants.PlayerCommand.prizeget, points: 10 });
            break;
          default:
            break;
        }
      });

      socket.on('close', () => {
        logger.log(LogLevel.info, clientPlayer.ipAddr + ' - socket closed');
        this.players.forEach((p, i) => {
          if (p === clientPlayer) {
            this.dequeuePlayer(p);
            this.deactivatePlayer(p);
            this.players.splice(i, 1);
            return;
          }
        });
      });

      socket.on('error', (err: any) => {
        logger.log(LogLevel.info, clientPlayer.ipAddr + ' - socket error ' + err);
        this.players.forEach((p, i) => {
          if (p === clientPlayer) {
            this.dequeuePlayer(p);
            this.deactivatePlayer(p);
            this.players.splice(i, 1);
            return;
          }
        });
      });
    });

    setInterval(() => {
      this.checkPlayerQueue();
    }, 500);
    setInterval(() => {
      this.updateGameStats();
    }, 1000);
  }

  send(socket: any, data: object) {
    if (socket !== null && socket !== undefined) socket.send(JSON.stringify(data));
  }

  connectController() {
    // us->controller
    logger.log(LogLevel.info, 'Connecting controller ' + uriController + ':' + portController);
    this.clientController = new ws(uriController + ':' + portController);
    this.clientController.on('open', () => {
      logger.log(LogLevel.info, 'clientController open');
    });
    this.clientController.on('error', (err: any) => {
      logger.log(LogLevel.info, 'clientController error ' + err);
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

  checkPlayerQueue() {
    if (this.currentPlayer === null && this.queue.length > 0) {
      this.activatePlayer(this.queue.shift());
    }
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
    this.send(this.clientController, { command: constants.ControllerCommand.resetclaw });
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
    return;
  }

  activatePlayer(p: any) {
    logger.log(LogLevel.info, p.uid + ' - activatePlayer');
    this.gameEnd();
    this.currentPlayer = p;
    this.dequeuePlayer(p);
    this.currentPlayer.gameState = constants.GameState.standby;
    this.currentPlayer.standby(() => {
      this.deactivatePlayer(this.currentPlayer);
    });
  }

  deactivatePlayer(p: any) {
    logger.log(LogLevel.info, p.uid + ' - deactivatePlayer');
    if (this.currentPlayer !== null && this.currentPlayer !== undefined) {
      if (this.currentPlayer !== p) {
        logger.log(LogLevel.info, p.uid + ' - bad player!');
        return;
      }
      this.gameEnd();
    }
  }

  queuePlayer(p: any) {
    if (this.currentPlayer !== null && this.currentPlayer !== undefined) if (this.currentPlayer === p) return; // what are you even trying to accomplish?
    logger.log(LogLevel.info, p.uid + ' - Queue');
    if (!this.queue.includes(p)) {
      this.queue.push(p);
      p.send({ command: constants.PlayerCommand.queue, success: true });
      logger.log(LogLevel.info, p.uid + ' - player queued');
    } else {
      p.send({ command: constants.PlayerCommand.queue, success: false });
      logger.log(LogLevel.info, p.uid + ' - player already queued');
    }
  }

  dequeuePlayer(p: any) {
    logger.log(LogLevel.info, p.uid + ' - dequeue');
    this.queue.forEach(function (item, index, object) {
      if (item === p) {
        object.splice(index, 1);
        return;
      }
    });
    p.send({ action: constants.PlayerCommand.dequeue, success: true });
  }
}

new server();
