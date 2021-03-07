/* eslint-disable no-param-reassign */
import WS from 'ws';
import http from 'http';
import { Player, LogLevel, LoggerClass, constants } from 'fuku.tv-shared';

const logger = new LoggerClass('viewerServer');

const uriController = 'ws://96.61.12.109';

const portController = 10777;

export class ControllerServer {
  queue: any[];

  players: Player[];

  currentPlayer: Player;

  watchCounter: number;

  queueCounter: number;

  clientController: any;

  clientVideo1: any;

  clientVideo2: any;

  serial: any;

  wss: WS.Server;

  constructor(server: http.Server) {
    this.currentPlayer = null;
    this.watchCounter = 0;
    this.queueCounter = 0;
    this.connectController();

    // client->us
    this.wss = new WS.Server({ server });

    this.wss.on('connection', (socket: any, req: any) => {
      const clientPlayer = new Player(socket, this.players.length + 1, this.queue.length, 800, 480, req.connection.remoteAddress);
      logger.log(LogLevel.info, `${clientPlayer.ipAddr} - socket open. id: ${clientPlayer.uid}`);
      this.players.push(clientPlayer);
      socket.player = clientPlayer;

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
            this.queuePlayer(socket.player);
            break;
          case constants.PlayerCommand.dequeue:
            this.dequeuePlayer(socket.player);
            break;
          case constants.PlayerCommand.login:
            break;
          case constants.PlayerCommand.logout:
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

    setInterval(() => {
      this.checkPlayerQueue();
    }, 500);
    setInterval(() => {
      this.updateGameStats();
    }, 1000);
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
          this.currentPlayer.send({ command: constants.PlayerCommand.prizeget, points: 10 });
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
    if (this.currentPlayer !== null && this.currentPlayer !== undefined) if (this.currentPlayer === p) return; // what are you even trying to accomplish?
    logger.log(LogLevel.info, `${p.uid} - Queue`);
    if (!this.queue.includes(p)) {
      this.queue.push(p);
      p.send({ command: constants.PlayerCommand.queue, success: true });
      logger.log(LogLevel.info, `${p.uid} - player queued`);
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
      }
    });
    p.send({ action: constants.PlayerCommand.dequeue, success: true });
  }
}

const send = (socket: WS, data: any) => {
  if (socket !== null && socket !== undefined) socket.send(JSON.stringify(data));
};

export default ControllerServer;
