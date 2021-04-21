/*
** We have ffmpeg use video4linux2 and open each usb webcam
** this encoded content is pumped out via stdout. This is captured via the ffmpegReaerArray
** using ffmpegServerArray[id].stdout.pipe(new splitter(NAL))
** We use the NAL splitter as a header to split between frames of data
**
** IMPORTANT IMPORTANT IMPORTANT
** ffmpeg outputs all log text to stderr.
** SETTING LOGLEVEL TO SILENT **********DOES NOT********** QUIET ALL OUTPUT TO STDERR
** If you do not dump the stderr buffer, ffmpeg will freeze because it cannot output anything to the stderr buffer!
**
*/

declare const Buffer;
import { LogLevel, LoggerClass, constants, ConfigManager } from 'fuku.tv-shared';
import ws from 'ws';
import splitter from 'stream-split';
import { spawn } from 'child_process';
import express from 'express';

var app = express();
const logger = new LoggerClass('videoServer');
const NAL = new Buffer.from([0, 0, 0, 1]);
const config = new ConfigManager('/etc/fuku/config.json', configUpdate);

var ffmpegArgs = config.get('ffmpegArgs');
var ffmpegInstances = config.get('ffmpegInstances');
var videoPortStart = config.get('videoPortStart');
var ffmpegServerArray = [];
var ffmpegReaderArray = [];
var ffmpegConfigArray = [];
var ffmpegStateArray = [];
var wssArray = [];
var serverArray = [];

function configUpdate() {
  ffmpegArgs = config.get('ffmpegArgs');
  ffmpegInstances = config.get('ffmpegInstances');
  videoPortStart = config.get('videoPortStart');
  initalizeFfmpegArray();
  logger.log(LogLevel.info, 'Config changed, respawning ffmpeg.');
  for (var i = 0; i < ffmpegInstances; i++)
    if (ffmpegServerArray[i] !== null && ffmpegServerArray[i] !== undefined)
      ffmpegServerArray[i].kill();
}

function initalizeFfmpegArray(id: number = -1) {
  var istart = (id === -1) ? 0 : id;
  var iend = (id === -1) ? ffmpegInstances : id + 1;

  logger.log(LogLevel.info, `initalizeFfmpegArray id: ${id}`);

  for (var i = istart; i < iend; i++) {
    logger.log(LogLevel.info, `initalizeFfmpegArray i: ${i}`);
    logger.log(LogLevel.info, `initalizeFfmpegArray input_device: ${ffmpegArgs['input_device' + i]}`);
    ffmpegConfigArray[i] = [
      '-loglevel', ffmpegArgs.loglevel,
      '-f', ffmpegArgs.input_format,
      '-video_size', ffmpegArgs.input_dimensions,
      '-r', ffmpegArgs.input_framerate,
      '-i', ffmpegArgs['input_device' + i],
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
  }
}

function initalizeWSSArray() {
  logger.log(LogLevel.info, `initalizeWSSArray instances: ${ffmpegInstances}`);
  for (var i = 0; i < ffmpegInstances; i++) {
    logger.log(LogLevel.info, `initalizeWSSArray videoPort: ${videoPortStart + i}`);
    wssArray[i] = new ws.Server({noServer: true });
    serverArray[i] = app.listen(videoPortStart + i);
    serverArray[i].on('upgrade', (request: any, socket: any, header: any) => {
      wssArray[i].handleUpgrade(request, socket, header, (socket: any) => {
        wssArray[i].emit('connection', socket, request);
      });
    });
  }
}

function initalizeVideoServer(id: any = -1) {
  logger.log(LogLevel.info, `initalizeVideoServer id: ${id}`);
  if (id > -1) {
    setupVideoServer(id);
    setupVideoReader(id);
    swapVideoState(id, constants.VideoState.active);
  } else {
    for (var i = 0; i < ffmpegInstances; i++) {
      setupVideoServer(i);
      setupVideoReader(i);
      swapVideoState(i, constants.VideoState.active);
    }
  }
}

function setupVideoServer(id: number) {
  logger.log(LogLevel.info, `setupVideoServer id: ${id}`);
  ffmpegServerArray[id] = spawn('ffmpeg', ffmpegConfigArray[id]);
  ffmpegServerArray[id].stderr.on('data', () => { }); // ffmpeg outputs to stderr, get it out of the buffer or ffmpeg pauses b/c full stderr buffer
  ffmpegReaderArray[id] = ffmpegServerArray[id].stdout.pipe(new splitter(NAL));
  ffmpegServerArray[id].on('error', (code: any) => { swapVideoState(id, constants.VideoState.inactive); });
  ffmpegServerArray[id].on('exit', (code: any) => { swapVideoState(id, constants.VideoState.inactive); });
  ffmpegServerArray[id].on('close', (code: any) => {
    swapVideoState(id, constants.VideoState.inactive);
    setTimeout(() => {
      initalizeVideoServer(id);
    }, 1000);
  });
}

function setupVideoReader(id: number) {
  logger.log(LogLevel.info, `setupVideoReader id: ${id}`);
  ffmpegReaderArray[id] = ffmpegServerArray[id].stdout.pipe(new splitter(NAL));
  ffmpegReaderArray[id].on('data', (data: any) => {
    wssArray[id].clients.forEach((socket: any) => {
      socket.send(Buffer.concat([NAL, data]), {binary: true});
    });
  });
}

function swapVideoState(id: number, state: any) {
  ffmpegStateArray[id] = state;
}

initalizeFfmpegArray();
initalizeWSSArray();
initalizeVideoServer();
