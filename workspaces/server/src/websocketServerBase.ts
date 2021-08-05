import WS from 'ws';
import http from 'http';
import { LoggerClass } from 'fuku.tv-shared';

interface WebsocketServer {
  run: () => void;
}

const logger = new LoggerClass('WebsocketServer');

abstract class WebsocketServerBase implements WebsocketServer {
  wss: WS.Server;

  server: http.Server;

  constructor(server: http.Server) {
    this.server = server;
    this.wss = new WS.Server({ server });
  }

  abstract run(): void;
}

export default WebsocketServerBase;
