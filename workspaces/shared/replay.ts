import crypto from 'crypto'
import constants from './constants'
import { replayTableModel } from './dynamodb/table';
import { Replay as ReplayModel } from './dynamodb/models';

export class Replay {
  id: string;
  data: string;

  constructor(id='') {
    this.data = '';
  }

  createReplay(id: string) { }
  addReplayData(data: string) {
    this.data += data;
  }

  saveReplay() {
    // take this.data and stash it in a temp folder
    // might need to run ffmpeg on it?
    // move it to s3
    // link it in DB
  }

  addReplay() { }

  getReplay() { }
}
