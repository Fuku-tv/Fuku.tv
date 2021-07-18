import WS from 'ws';
import http from 'http';

interface WebsocketServer {
  run: (port) => void;
}

abstract class WebsocketServerBase implements WebsocketServer {
  wss: WS.Server;

  server: http.Server;

  constructor(server: http.Server) {
    this.server = server;
    this.wss = new WS.Server({ server });
  }

  run(port: number): void {
    this.server.listen(port);
  }
}

export default WebsocketServerBase;
