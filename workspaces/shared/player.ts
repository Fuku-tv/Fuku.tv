import crypto from 'crypto';
import type ws from 'ws';
import constants from './constants';
import { playersTableModel } from './dynamodb/table';
import type { Player as PlayerModel } from './dynamodb/models';
import type Command from './command';

// IDLE -> QUEUE -> STANDBY -> PLAYING -> END

export class Player {
  socket: ws;

  userdata: { email: string; nickname: string; pictureUrl: string };

  timePlay = 30100;

  timeStandby = 60100;

  playTimer: NodeJS.Timeout = null;

  standbyTimer: NodeJS.Timeout = null;

  keepaliveTimer: NodeJS.Timeout = null;

  isLoggedIn = false;

  gameState: string = constants.GameState.idle;

  video: string = constants.Video.front;

  uid = '';

  ipAddr: any;

  freeplay: number;

  credits: number;

  points: number;

  constructor(socket: ws, ip: any) {
    this.socket = socket;
    this.ipAddr = ip;

    this.keepaliveTimer = setInterval(() => {
      this.send({ keepalive: Date.now() });
    }, 10000);
  }

  Login(userdata: { nickname: string; email: string; pictureUrl: string }, queueCount = 0, watchCount = 0, videoWidth = 0, videoHeight = 0): void {
    this.userdata = userdata;
    this.fetchInitialPlayerData()
      .then(() => {
        this.send({
          command: constants.PlayerCommand.init,
          width: videoWidth,
          height: videoHeight,
          credits: this.credits,
          points: this.points,
          freeplay: this.freeplay,
          queue: queueCount,
          watch: watchCount,
          test: false,
        });
      })
      .catch((error) => {});

    this.isLoggedIn = true;
  }

  logout() {
    this.userdata = null;
    this.isLoggedIn = false;
  }

  send(data: Command): void {
    if (this.socket !== null && this.socket !== undefined) this.socket.send(JSON.stringify(data));
  }

  sendVideo(data: Command): void {
    if (this.socket !== null && this.socket !== undefined) this.socket.send(data, { binary: true });
  }

  sendDebug(data: any): void {
    if (this.socket !== null && this.socket !== undefined) this.socket.send(JSON.stringify({ command: 'debug', debug: data }));
  }

  resetTimers(): void {
    if (this.playTimer !== null) clearTimeout(this.playTimer);
    if (this.standbyTimer !== null) clearTimeout(this.standbyTimer);
  }

  updateGameStats(qc: number, wc: number, playing: string): void {
    this.send({
      playing,
      command: constants.PlayerCommand.gamestats,
      queue: qc,
      watch: wc,
      credits: this.credits,
      freeplay: this.freeplay,
      points: this.points,
    });
  }

  standby(callback: () => void): void {
    this.resetTimers();
    this.gameState = constants.GameState.standby;
    this.standbyTimer = setTimeout(callback, this.timeStandby);
    this.send({ command: constants.PlayerCommand.gamestandby });
  }

  play(callback: () => void): void {
    this.resetTimers();
    // use freeplay first
    if (this.freeplay > 0) {
      this.freeplay -= 1;
      playersTableModel.removeFreeplay(this.userdata.email, 1);
    } else if (this.credits > 0) {
      this.credits -= 1;
      playersTableModel.removeCredits(this.userdata.email, 1);
    } else if (this.points >= 200) {
      this.points -= 200;
      playersTableModel.removePoints(this.userdata.email, 200);
      // you don't have the freeplay or credits!
      // need UI for this
    } else {
      // you don't have the freeplay or credits!
      // need UI for this
    }
    this.gameState = constants.GameState.playing;
    this.playTimer = setTimeout(callback, this.timePlay);
    this.send({ command: constants.PlayerCommand.gameplay });
  }

  playEnd(): void {
    this.resetTimers();
    this.gameState = constants.GameState.ending;
  }

  gameEnd(): void {
    this.resetTimers();
    this.gameState = constants.GameState.idle;
    this.send({ command: constants.PlayerCommand.gameend });
  }

  async addPoints(points: number): Promise<void> {
    await playersTableModel.addPoints(this.userdata.email, points);
  }

  async redeemPoints(points: number, credits: number): Promise<void> {
    await playersTableModel.removePoints(this.userdata.email, points);
    await playersTableModel.addCredits(this.userdata.email, credits);
  }

  /**
   * Fetch player data from Database, create new player if ID not found
   */
  private async fetchInitialPlayerData() {
    // get current player
    try {
      const player = await playersTableModel.get(this.userdata.email);
      if (player.points === undefined) this.points = 0;
      else this.points = player.points;
      if (player.credits === undefined) this.credits = 0;
      else this.credits = player.credits;
      if (player.freeplay === undefined) {
        await playersTableModel.addFreeplay(this.userdata.email, 10);
        this.freeplay = 10;
      } else this.freeplay = player.freeplay;

      this.uid = player.id;
    } catch {
      // no player found, creating new player
      const data: PlayerModel = {
        id: this.userdata.email,
        credits: 0,
        freeplay: 10,
        points: 0,
        xp: 0,
        email: this.userdata.email,
        nickname: this.userdata.nickname,
        ipAddress: this.ipAddr,
      };
      await playersTableModel.write(data);
      // read data once written
      const player = await playersTableModel.get(this.userdata.email);
      this.credits = player.credits;
      this.uid = player.id;
    }
  }
}

export default Player;
