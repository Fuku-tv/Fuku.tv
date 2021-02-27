import WS from 'ws';
import http from 'http';
import crypto from 'crypto';
import { LogLevel, LoggerClass, constants, Command } from 'fuku.tv-shared';
import Viewer from './viewer';

const logger = new LoggerClass('viewerVideoServer');

const uriVideo1 = 'ws://96.61.12.109:10778';
const uriVideo2 = 'ws://96.61.12.109:10779';

export class VideoServer {
  viewers: Viewer[];
  keyframes: [];

  wss: WS.Server;

  constructor(server: http.Server) {
    this.viewers = [];
    this.keyframes = [];
    this.connectVideo(uriVideo1, constants.Video.front);
    this.connectVideo(uriVideo2, constants.Video.side);

    this.wss = new WS.Server({ server });

    this.wss.on('connection', (socket, req) => {
      const viewer = new Viewer(socket, req.connection.remoteAddress);
      this.viewers.push(viewer);
      logger.log(LogLevel.info, `${viewer.ipAddr} - socket open.`);

      socket.on('message', (data: any) => {
        const msg = typeof data === 'object' ? JSON.stringify(data) : JSON.parse(data);

        switch (msg.command) {
          case constants.PlayerCommand.swapvideo:
            this.swapVideo(viewer, msg.video);
            break;
          default:
            logger.log(LogLevel.error, `Bad command: ${data}`);
            break;
        }
      });

      // close always follows error
      socket.on('error', (err: any) => {
        logger.log(LogLevel.info, `${viewer.ipAddr} - socket error ${err}`);
      });

      socket.on('close', () => {
        this.viewers.forEach((p, i) => {
          if (p === viewer) {
            this.viewers.splice(i, 1);
          }
        });
      });
    });
  }

  connectVideo(uri: string, position: string) {
    const socket = new WS(uri);


    socket.on('open', () => {
      logger.log(LogLevel.info, `${uri} - Socket opened`);
    });
    socket.on('error', (err: any) => {
      logger.log(LogLevel.error, `${uri} - Socket error ${err}`);
    });
    socket.on('close', () => {
      logger.log(LogLevel.info, `${uri} - Socket closed`);
      setTimeout(() => {
        logger.log(LogLevel.info, `${uri} - attempting reconnect`);
        this.connectVideo(uri, position);
      }, 500);
    });

    socket.on('message', (data: any) => {
      if (data[4] === 104) {
        this.keyframes[position] = data;
      }
      this.viewers.forEach((p) => {
        if (p.video === position) p.sendVideo(data);
      });
    });
  }

  swapVideo(v: any, video: string) {
    this.viewers.forEach((p: any, i: number) => {
      if (p === v) {
        this.viewers[i].video = video;
        p.sendVideo(this.keyframes[video]);
      }
    });
  }
}

export default VideoServer;
