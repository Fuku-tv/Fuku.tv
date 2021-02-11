import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { ControllerServer } from './viewerControllerServer';

import { VideoServer } from './viewerVideoServer';

const privateKey = fs.readFileSync(path.resolve(__dirname, '../certs/key.pem'), 'utf8');
const certificate = fs.readFileSync(path.resolve(__dirname, '../certs/cert.pem'), 'utf8');
const credentials = {
  key: privateKey,
  cert: certificate,
};

/**
 * Health Check endpoint
 */
const hcServer = http.createServer((req, res) => {
  res.writeHead(200);
  res.write('ok, default endpoint good here!');
  res.end();
});

const controllerHttpsServer = http.createServer((req, res) => {
  res.writeHead(200);
  res.write('ok, controller good here!');
  res.end();
});

const videoHttpsServer = http.createServer((req, res) => {
  res.writeHead(200);
  res.write('ok, video good here!');
  res.end();
});

hcServer.listen(8080);
controllerHttpsServer.listen(10888);
videoHttpsServer.listen(10889);

const controller = new ControllerServer(controllerHttpsServer);
const video = new VideoServer(videoHttpsServer);
