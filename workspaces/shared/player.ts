import crypto from 'crypto';
import type ws from 'ws';
import constants from './constants';
import { playersTableModel } from './dynamodb/table';
import { Player as PlayerModel } from './dynamodb/models';
import type Command from './command';

// IDLE -> QUEUE -> STANDBY -> PLAYING -> END

export class Player {
  socket: ws;

  userdata: { email: string; nickname: string };

  timePlay: number = 30100;

  timeStandby: number = 60100;

  playTimer: any = null;

  standbyTimer: any = null;

  keepaliveTimer: any = null;

  isPlaying: boolean = false;

  isLoggedIn: boolean = false;

  isQueued: boolean = false;

  gameState: any = constants.GameState.idle;

  video: any = constants.Video.front;

  uid: string = '';

  ipAddr: any;

  freeplay: any;

  lastfreeplaydate: any;

  credits: any;
  points: any;


  constructor(socket: ws, ip: any) {
    this.socket = socket;
    this.ipAddr = ip;

    this.keepaliveTimer = setInterval(() => {
      this.send({ keepalive: Date.now() });
      if (this.isLoggedIn === false) return;
      if (Math.floor(new Date().getTime() / 1000) >= this.lastfreeplaydate + 86400000) {
        playersTableModel.addFreeplay(this.userdata.email, 5).then(() => {
          this.freeplay += 5;
          this.send({
            command: constants.PlayerCommand.gamestats,
            freeplay: this.freeplay,
          });
        });
        playersTableModel.updateLastFreeplayDate(this.userdata.email).then(() => {
          this.lastfreeplaydate = Math.floor(new Date().getTime() / 1000);
        });
      }
    }, 10000);
  }

  Login(userdata: { nickname: string; email: string }, queueCount = 0, watchCount = 0, videoWidth = 0, videoHeight = 0): void {
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
    this.send({
      command: 'debug',
      debug: this.lastfreeplaydate,
    });
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

  updateGameStats(qc: number, wc: number): void {
    this.send({
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
        await playersTableModel.updateLastFreeplayDate(this.userdata.email);
        this.freeplay = 10;
      } else this.freeplay = player.freeplay;
      if (player.lastfreeplaydate === undefined) this.lastfreeplaydate = 0;
      else this.lastfreeplaydate = player.lastfreeplaydate;
      this.uid = player.id;
    } catch {
      // no player found, creating new player
      const data: PlayerModel = {
        id: this.userdata.email,
        credits: 0,
        freeplay: 10,
        lastfreeplaydate: Math.floor(new Date().getTime() / 1000),
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
