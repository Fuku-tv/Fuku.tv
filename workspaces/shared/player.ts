import crypto from 'crypto';
import type ws from 'ws';
import constants from './constants';
import { playersTableModel } from './dynamodb/table';
import { Player as PlayerModel } from './dynamodb/models';
import type Command from './command';

// IDLE -> QUEUE -> STANDBY -> PLAYING -> END

export class Player {
  socket: ws;

  email: string;

  credits: number;

  timePlay: number;

  timeStandby: number;

  playTimer: any;

  standbyTimer: any;

  isPlaying: boolean;

  isLoggedIn: boolean;

  isQueued: boolean;

  gameState: any;

  video: any;

  uid: string;

  ipAddr: any;

  qc: number;

  wc: number;

  level: number;

  xp: number;

  constructor(s: ws, wc: number, qc: number, vw: number, vh: number, ip: any) {
    this.socket = s;
    this.timePlay = 30100;
    this.timeStandby = 60100;
    this.playTimer = null;
    this.standbyTimer = null;
    this.isPlaying = false;
    this.isLoggedIn = false;
    this.isQueued = false;
    this.gameState = constants.GameState.idle;
    this.video = constants.Video.front;
    // this.uid = crypto.randomBytes(256).toString('hex');
    this.ipAddr = ip;

    this.level = 1;
    this.xp = 0;

    this.fetchInitialPlayerData()
      .then(() => {
        this.send({ command: constants.PlayerCommand.init, width: vw, height: vh, credits: this.credits, queue: qc, watch: wc, test: false });
      })
      .catch((error) => {});

    // this.socket.on('message', (data) => { this.parseCommand(JSON.parse(data)); });
  }

  send(data: Command): void {
    if (this.socket !== null && this.socket !== undefined) this.socket.send(JSON.stringify(data));
  }

  sendVideo(data: Command): void {
    if (this.socket !== null && this.socket !== undefined) this.socket.send(data, { binary: true });
  }

  resetTimers(): void {
    if (this.playTimer !== null) clearTimeout(this.playTimer);
    if (this.standbyTimer !== null) clearTimeout(this.standbyTimer);
  }

  updateGameStats(qc: number, wc: number) {
    this.send({
      command: constants.PlayerCommand.gamestats,
      queue: qc,
      watch: wc,
      credits: this.credits,
    });
  }

  standby(callback: any) {
    this.resetTimers();
    this.gameState = constants.GameState.standby;
    this.standbyTimer = setTimeout(callback, this.timeStandby);
    this.send({ command: constants.PlayerCommand.gamestandby });
  }

  play(callback: any) {
    this.resetTimers();
    this.credits -= 1;
    this.gameState = constants.GameState.playing;
    this.updateGameStats(this.qc, this.wc);
    this.playTimer = setTimeout(callback, this.timePlay);
    this.send({ command: constants.PlayerCommand.gameplay });
  }

  playEnd() {
    this.resetTimers();
    this.gameState = constants.GameState.ending;
  }

  gameEnd() {
    this.resetTimers();
    this.gameState = constants.GameState.idle;
    this.send({ command: constants.PlayerCommand.gameend });
  }

  /**
   * Fetch player data from Database, create new player if ID not found
   */
  private async fetchInitialPlayerData() {
    // get current player
    try {
      const player = await playersTableModel.get(this.ipAddr);
      this.credits = player.credits;
      this.uid = player.id;
    } catch {
      // no player found, creating new player
      const data: PlayerModel = {
        id: this.ipAddr,
        credits: 10,
        ipAddress: this.ipAddr,
      };
      await playersTableModel.write(data);
    }
  }
}

export default Player;
