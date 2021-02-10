import { constants } from 'fuku.tv-shared';
import ws from 'ws';
import crypto from 'crypto';

class Viewer {
  socket: ws;

  uid: string;

  video: string;

  ipAddr: string;

  swapvideo: boolean;

  constructor(s: ws, ip: string) {
    this.socket = s;
    this.uid = crypto.randomBytes(64).toString('hex');
    this.video = constants.Video.front;
    this.ipAddr = ip;
    this.swapvideo = false;
  }

  sendVideo(data: unknown): void {
    if (this.socket !== null && this.socket !== undefined) this.socket.send(data, { binary: true });
  }
}

export default Viewer;
