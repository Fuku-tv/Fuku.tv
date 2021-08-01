import WS from 'ws';
import http from 'http';
import { LoggerClass } from 'fuku.tv-shared';

interface WebsocketServer {
  run: (port) => void;
}

const logger = new LoggerClass('WebsocketServer');

abstract class WebsocketServerBase implements WebsocketServer {
  wss: WS.Server;

  server: http.Server;

  constructor(server: http.Server) {
    this.server = server;
    this.wss = new WS.Server({ server });
  }

  run(port: number): void {
    this.server.listen(port);
    logger.logInfo(`Websocket server ${port} started.`);
  }
}

export default WebsocketServerBase;
