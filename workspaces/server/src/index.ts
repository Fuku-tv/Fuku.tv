import http from 'http';

import { ControllerServer } from './viewerControllerServer';

import { VideoServer } from './viewerVideoServer';

const controllerHttpsServer = http.createServer((req, res) => {
  res.writeHead(200);
  res.write('ok, good here!');
  res.end();
});
controllerHttpsServer.listen(8080);

// const videoHttpsServer = http.createServer();
// videoHttpsServer.listen(10889);

new ControllerServer(controllerHttpsServer);
// new VideoServer(videoHttpsServer);
