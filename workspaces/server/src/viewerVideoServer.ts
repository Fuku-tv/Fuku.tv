import WS from 'ws';

import { LogLevel, LoggerClass, constants, Command, env } from 'fuku.tv-shared';
import Viewer from './viewer';
import WebsocketServerBase from './websocketServerBase';

const logger = new LoggerClass('viewerVideoServer');

const [uriVideo1, uriVideo2] = env.piVideoURL();

export class VideoServer extends WebsocketServerBase {
  viewers: Viewer[] = [];

  keyframes: [] = [];

  videoState: string[] = [];

  async run(): Promise<void> {
    this.connectVideo(uriVideo1, constants.Video.front);
    this.connectVideo(uriVideo2, constants.Video.side);

    this.wss.on('connection', (socket: any, req: any) => {
      const viewer = new Viewer(socket, req.connection.remoteAddress);
      this.viewers.push(viewer);
      logger.log(LogLevel.info, `${viewer.ipAddr} - socket open.`);

      socket.on('message', (data: any) => {
        switch (data.command) {
          case constants.PlayerCommand.swapvideo:
            this.swapVideo(viewer, data.video);
            break;
          default:
            logger.log(LogLevel.error, `Bad command: ${data}, command passed was ${data.command},`);
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
    this.videoState[position] = { state: constants.VideoState.inactive };
    socket.on('open', () => {
      logger.log(LogLevel.info, `${uri} - Socket opened`);
      this.videoState[position] = { state: constants.VideoState.active };
    });
    socket.on('error', (err: any) => {
      logger.log(LogLevel.error, `${uri} - Socket error ${err}`);
      this.videoState[position] = { state: constants.VideoState.inactive };
    });
    socket.on('close', () => {
      logger.log(LogLevel.info, `${uri} - Socket closed`);
      this.videoState[position] = { state: constants.VideoState.inactive };
      setTimeout(() => {
        logger.log(LogLevel.info, `${uri} - attempting reconnect`);
        this.connectVideo(uri, position);
      }, 500);
    });

    socket.on('message', (data: any) => {
      if (typeof data === 'string') {
        const msg = JSON.parse(data);
        this.videoState[position] = msg.state;
        const newmsg = {
          state: msg.state,
          position,
        };
        this.viewers.forEach((p: any) => {
          p.socket.send(JSON.stringify(newmsg));
        });
        return;
      }
      if (data[4] === 104) {
        this.keyframes[position] = data;
      }
      this.viewers.forEach((p: any) => {
        if (p.video === position) p.sendVideo(data);
      });
    });
  }

  sendVideoState() {
    this.viewers.forEach((p: any) => {
      p.socket.send(JSON.stringify(this.videoState));
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
