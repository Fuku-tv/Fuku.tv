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

  points = 0;

  credits = 0;

  freeplay = 0;

  lastfreeplaydate: any = 0;

  timePlay = 30100;

  timeStandby = 60100;

  playTimer: any = null;

  standbyTimer: any = null;

  keepaliveTimer: any = null;

  isPlaying = false;

  isLoggedIn = false;

  isQueued = false;

  gameState: any = constants.GameState.idle;

  video: any = constants.Video.front;

  uid: string = '';

  ipAddr: any;

  level = 1;

  xp = 0;

  constructor(socket: ws, ip: any) {
    this.socket = socket;
    this.ipAddr = ip;

    this.keepaliveTimer = setInterval(() => {
      this.send({ keepalive: Date.now() });
      if (this.isLoggedIn === false) return;
      if (Math.floor(new Date().getTime() / 1000) >= this.lastfreeplaydate + 86400000) {
        this.freeplay += 2;
        this.lastfreeplaydate = Math.floor(new Date().getTime() / 1000);
        playersTableModel.addFreeplay(this.userdata.email, 2).then(() => {});
      }
    }, 5000);
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
      this.points = player.points;
      this.credits = player.credits;
      this.freeplay = player.freeplay;
      this.lastfreeplaydate = player.lastfreeplaydate;
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
