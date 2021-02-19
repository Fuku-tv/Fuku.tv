declare const Buffer;
import { LogLevel, LoggerClass, ConfigManager } from 'fuku.tv-shared';
import ws from 'ws';
import splitter from 'stream-split';
import { spawn } from 'child_process';
import express from 'express';

var app = express();
const logger = new LoggerClass('videoServer');
const NAL = new Buffer.from([0, 0, 0, 1]);

const config = new ConfigManager('/etc/fuku/config.json', configUpdate);
var ffmpegArgs = config.get('ffmpegArgs');
var videoPort = config.get('videoPort');
var ffmpegArray = [];

function updateFfmpegArray() {
  ffmpegArray = [
    '-loglevel', ffmpegArgs.loglevel,
    '-f', ffmpegArgs.input_format,
    '-video_size', ffmpegArgs.input_dimensions,
    '-r', ffmpegArgs.input_framerate,
    '-i', ffmpegArgs.input_device,
    '-ss', ffmpegArgs.seek, // delays encoding while webcam wakes
    '-pix_fmt', ffmpegArgs.pix_fmt,
    '-c:v', ffmpegArgs.video_codec,
    '-b:v', ffmpegArgs.video_bitrate,
    '-bufsize', ffmpegArgs.buffersize,
    '-vprofile', ffmpegArgs.video_profile,
    '-preset', ffmpegArgs.video_preset,
    '-tune', ffmpegArgs.video_tune,
    '-g', ffmpegArgs.gop,
    '-an', // no audio
    '-f', ffmpegArgs.output_format,
    '-' // pipes to stdout
  ];
  console.log(ffmpegArray);
}

updateFfmpegArray();

var ffmpegServer = spawn('ffmpeg', ffmpegArray);
var ffmpegReader = null;

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
    ffmpegServer = spawn('ffmpeg', ffmpegArray);
    ffmpegReader = ffmpegServer.stdout.pipe(new splitter(NAL));
    ffmpegReader.on('data', (data: any) => {
      wss.clients.forEach((socket: any) => {
        socket.send(Buffer.concat([NAL, data]), { binary: true });
      });
    });
  });
});

const wss = new ws.Server({ noServer: true });
ffmpegReader = ffmpegServer.stdout.pipe(new splitter(NAL));
ffmpegReader.on('data', (data: any) => {
  wss.clients.forEach((socket: any) => {
    socket.send(Buffer.concat([NAL, data]), { binary: true });
  });
});

const server = app.listen(videoPort);
server.on('upgrade', (request: any, socket: any, header: any) => {
  wss.handleUpgrade(request, socket, header, (socket: any) => {
    wss.emit('connection', socket, request);
  });
});

function configUpdate() {
  ffmpegArgs = config.get('ffmpegArgs');
  updateFfmpegArray();
  console.log('config updated!');
  ffmpegServer.kill();
}
