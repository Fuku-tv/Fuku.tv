import fs from 'fs';
import { LoggerClass, LogLevel } from 'fuku.tv-shared';
import http from 'http';
import ws from 'ws';
const logger = new LoggerClass('viewerControllerServer');
const port = process.env.PORT || 8080;

const log = (entry) => {
  fs.appendFileSync('/tmp/sample-app.log', `${new Date().toISOString()} - ${entry}\n`);
};

const middleware = (req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      if (req.url === '/') {
        log(`Received message: ${body}`);
      } else if ((req.url = '/scheduled')) {
        log(`Received task ${req.headers['x-aws-sqsd-taskname']} scheduled at ${req.headers['x-aws-sqsd-scheduled-at']}`);
      }

      res.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
      res.end();
    });
  } else {
    res.writeHead(200);
    res.write('ok, good here!');
    res.end();
  }
};

const server = http.createServer();
class Server {
  wss: ws.Server;

  constructor() {
    this.wss = new ws.Server({ server: server });

    this.wss.on('connection', (socket: ws, req: any) => {
      socket.send('Connection Established Fuku');
      socket.on('message', (data: any) => {
        socket.send('Test Message');
      });
      socket.on('close', () => {});
      socket.on('error', (err: any) => {});
    });
  }
  send(socket: any, data: object) {
    if (socket !== null && socket !== undefined) socket.send(JSON.stringify(data));
  }
}

console.log('listening on port 8080');
server.listen(port);
new Server();
