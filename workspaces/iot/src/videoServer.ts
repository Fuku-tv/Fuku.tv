declare const Buffer;
import { LogLevel, LoggerClass } from 'fuku.tv-shared';
import ws from 'ws';
import splitter from 'stream-split';
import { spawn } from 'child_process';
import express from 'express';

var app = express();
const logger = new LoggerClass('videoServer');
const NAL = new Buffer.from([0, 0, 0, 1]);
const port = 10778;

var ffmpegArgs = [
  '-loglevel',
  'quiet',
  '-f',
  'video4linux2',
  '-video_size',
  '800x480',
  '-r',
  '15',
  '-i',
  '/dev/video0',
  '-ss',
  '00:00:05',
  '-pix_fmt',
  'yuv420p',
  '-c:v',
  'libx264',
  '-b:v',
  '600k',
  '-bufsize',
  '2000k',
  '-vprofile',
  'baseline',
  '-preset',
  'ultrafast',
  '-tune',
  'zerolatency',
  '-g',
  '30',
  '-an',
  '-f',
  'rawvideo',
  '-',
];

var ffmpegServer = spawn('ffmpeg', ffmpegArgs);

ffmpegServer.on('error', (code: any) => {
  logger.log(LogLevel.error, 'ffmpeg error ' + code);
});
ffmpegServer.on('exit', (code: any) => {
  logger.log(LogLevel.error, 'ffmpeg exit ' + code);
});
ffmpegServer.on('close', (code: any) => {
  logger.log(LogLevel.error, 'ffmpeg closed ' + code);
  setTimeout(() => {
    logger.log(LogLevel.info, 'Respawning ffmpeg');
    ffmpegServer = spawn('ffmpeg', ffmpegArgs);
  }, 500);
});

const wss = new ws.Server({ noServer: true });
var ffmpegReader = ffmpegServer.stdout.pipe(new splitter(NAL));
ffmpegReader.on('data', (data: any) => {
  wss.clients.forEach((socket: any) => {
    socket.send(Buffer.concat([NAL, data]), { binary: true });
  });
});

const server = app.listen(port);
server.on('upgrade', (request: any, socket: any, header: any) => {
  wss.handleUpgrade(request, socket, header, (socket: any) => {
    wss.emit('connection', socket, request);
  });
});
