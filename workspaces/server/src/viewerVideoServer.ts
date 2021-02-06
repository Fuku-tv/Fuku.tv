import fs from 'fs';
import ws from 'ws';
import https from 'https';
import crypto from 'crypto';
import { LogLevel, LoggerClass } from 'fuku.tv-shared';
import { constants } from 'fuku.tv-shared';

// const config = require('/etc/fuku/config/global.json');
const logger = new LoggerClass('viewerVideoServer');

// var privateKey = fs.readFileSync(config.sslpath + 'privkey.pem', 'utf8');
// var certificate = fs.readFileSync(config.sslpath + 'fullchain.pem', 'utf8');
// var credentials = {
//   key: privateKey,
//   cert: certificate,
// };

const httpsServer = https.createServer();
httpsServer.listen(10889);

const uriVideo1 = 'ws://96.61.12.109:10778';
const uriVideo2 = 'ws://96.61.12.109:10779';

class Viewer {
  socket: any;
  uid: String;
  video: String;
  ipAddr: any;
  swapvideo: boolean;

  constructor(s: any, ip: any) {
    this.socket = s;
    this.uid = crypto.randomBytes(64).toString('hex');
    this.video = constants.Video.front;
    this.ipAddr = ip;
    this.swapvideo = false;
  }

  sendVideo(data: any) {
    if (this.socket !== null && this.socket !== undefined) this.socket.send(data, { binary: true });
  }
}

class server {
  viewers: any[];
  clientVideo1: any;
  clientVideo2: any;
  wss: any;

  constructor() {
    this.viewers = [];
    this.connectVideo(this.clientVideo1, uriVideo1, constants.Video.front);
    this.connectVideo(this.clientVideo2, uriVideo2, constants.Video.side);

    this.wss = new ws.Server({ server: httpsServer });

    this.wss.on('connection', (socket: any, req: any) => {
      var viewer = new Viewer(socket, req.connection.remoteAddress);
      this.viewers.push(viewer);
      logger.log(LogLevel.info, viewer.ipAddr + ' - socket open.');

      socket.on('message', (data: any) => {
        if (typeof data === 'object') data = JSON.stringify(data);
        var msg = JSON.parse(data);
        switch (msg.command) {
          case constants.PlayerCommand.swapvideo:
            this.swapVideo(viewer, msg.video);
            break;
          default:
            logger.log(LogLevel.info, 'Bad command: ' + data);
            break;
        }
      });

      // close always follows error
      socket.on('error', (err: any) => {
        logger.log(LogLevel.info, viewer.ipAddr + ' - socket error ' + err);
      });

      socket.on('close', () => {
        this.viewers.forEach((p, i) => {
          if (p === viewer) {
            this.viewers.splice(i, 1);
            return;
          }
        });
      });
    });
  }

  connectVideo(socket: any, uri: string, position: string) {
    if (socket !== null && socket !== undefined) {
      logger.log(LogLevel.info, 'Attempted to connect socket, but socket not null!');
      return;
    }
    socket = new ws(uri);
    socket.on('open', () => {
      logger.log(LogLevel.info, uri + ' - Socket opened');
    });
    socket.on('error', (err: any) => {
      logger.log(LogLevel.error, uri + ' - Socket error ' + err);
    });
    socket.on('close', () => {
      logger.log(LogLevel.info, uri + ' - Socket closed');
      setTimeout(() => {
        logger.log(LogLevel.info, uri + ' - attempting reconnect');
        socket = null;
        this.connectVideo(socket, uri, position);
      }, 500);
    });

    socket.on('message', (data: any) => {
      this.viewers.forEach((p) => {
        if (p.video === position) p.sendVideo(data);
      });
    });
  }

  swapVideo(v: any, video: String) {
    this.viewers.forEach((p: any, i: number) => {
      if (p === v) {
        this.viewers[i].video = video;
        return;
      }
    });
  }
}

new server();
