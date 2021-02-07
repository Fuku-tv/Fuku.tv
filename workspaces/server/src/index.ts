import http from 'http';

import { ControllerServer } from './viewerControllerServer';

import { VideoServer } from './viewerVideoServer';

const controllerHttpsServer = http.createServer();
controllerHttpsServer.listen(8080);

// const videoHttpsServer = http.createServer();
// videoHttpsServer.listen(10889);

new ControllerServer(controllerHttpsServer);
// new VideoServer(videoHttpsServer);
