import onoff from 'onoff';
import ws from 'ws';
import express from 'express';
import { LogLevel, LoggerClass, constants } from 'fuku.tv-shared';

const gpio = onoff.Gpio;
const logger = new LoggerClass('controllerServer');
const ioUp = new gpio(17, 'out');
const ioDown = new gpio(27, 'out');
const ioLeft = new gpio(22, 'out');
const ioRight = new gpio(5, 'out');
const ioDrop = new gpio(6, 'out');
const ioSensor = new gpio(26, 'in', 'both');

var buttons = {};

// remapped because of how the wires work in the physical game
buttons['up'] = ioRight;
buttons['down'] = ioLeft;
buttons['left'] = ioDown;
buttons['right'] = ioUp;
buttons['drop'] = ioDrop;
buttons['button'] = ioDrop;
buttons['start'] = null; // just to catch start events sent over

const port = 10777;

const wss = new ws.Server({ noServer: true });
const server = express().listen(port);
server.on('upgrade', (request: any, socket: any, header: any) => {
  wss.handleUpgrade(request, socket, header, (socket: any) => {
    wss.emit('connection', socket, request);
  });
});

function resetButtons() {
  Object.keys(buttons).forEach((b) => {
    if (buttons[b] !== null) {
      buttons[b].writeSync(0);
    }
  });
}

function resetClaw() {
  buttons['drop'].writeSync(1);
  setTimeout(resetButtons, 50);
}

var prevButton = {
  button: null,
  action: null
};

function doButton(btn: any, act: any) {
  if (btn === null || btn === undefined) {
    logger.log(LogLevel.error, 'Btn undefined');
    return;
  }
  if (buttons[btn] === undefined) {
    // what are we doing?
    logger.log(LogLevel.error, 'Bad button - ' + btn + ' - ' + act);
    return;
  }

  if (prevButton.button === btn && prevButton.action === act) {
    // bounce protection
    logger.log(LogLevel.error, 'Button bounce - ' + btn + ' - ' + act);
    return;
  }

  resetButtons();
  buttons[btn].writeSync(act);
}

wss.on('connection', (socket: any, req: any) => {
  var ipAddr = req.connection.remoteAddress;
  logger.log(LogLevel.info, ipAddr + ' - connected');
  socket.on('message', (data: any) => {
    var msg = JSON.parse(data);
    switch (msg.command) {
      case constants.ControllerCommand.buttonstart:
        doButton(msg.button, 1);
        break;
      case constants.ControllerCommand.buttonstop:
        doButton(msg.button, 0);
        break;
      case constants.ControllerCommand.resetclaw:
        resetClaw();
        break;
      default:
        logger.log(LogLevel.error, 'Bad command ' + msg.command);
        break;
    }
  });

  socket.on('error', (err: any) => {
    logger.log(LogLevel.error, ipAddr + ' - connection error ' + err);
  });
  socket.on('close', () => {
    logger.log(LogLevel.info, ipAddr + ' - connection closed');
  });
});
