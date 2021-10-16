import WS from 'ws';
import type https from 'https';
import { LoggerClass } from 'fuku.tv-shared';

interface WebsocketServer {
  run: () => void;
}

const logger = new LoggerClass('WebsocketServer');

abstract class WebsocketServerBase implements WebsocketServer {
  wss: WS.Server;

  server: https.Server;

  constructor(server: https.Server) {
    this.server = server;
    this.wss = new WS.Server({ server });
  }

  abstract run(): void;
}

export default WebsocketServerBase;
