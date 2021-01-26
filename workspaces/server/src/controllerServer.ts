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

const port = 10777;

const wss = new ws.Server({ noServer: true });
const server = express().listen(port);
server.on('upgrade', (request: any, socket: any, header: any) => {
  wss.handleUpgrade(request, socket, header, (socket: any) => {
    wss.emit('connection', socket, request);
  });
});

function resetClaw() {
  buttons['drop'].writeSync(1);
  setTimeout(() => {
    Object.keys(buttons).forEach((b) => {
      buttons[b].writeSync(0);
    });
  }, 50);
}

wss.on('connection', (socket: any, req: any) => {
  var ipAddr = req.connection.remoteAddress;
  logger.log(LogLevel.info, ipAddr + "' - connected");
  socket.on('message', (data) => {
    var msg = JSON.parse(data);
    switch (msg.command) {
      case constants.ControllerCommand.buttonstart:
        if (msg.button === null || msg.button === undefined || buttons[msg.button] === null || buttons[msg.button] === undefined) {
          logger.log(LogLevel.error, ipAddr + ' - bad button ' + msg.button);
          break;
        }
        buttons[msg.button].writeSync(1); // turn pin on
        break;
      case constants.ControllerCommand.buttonstop:
        if (msg.button === null || msg.button === undefined || buttons[msg.button] === null) {
          logger.log(LogLevel.error, ipAddr + ' - bad button ' + msg.button);
          break;
        }
        buttons[msg.button].writeSync(0);
        break;
      case constants.ControllerCommand.resetclaw:
        resetClaw();
        break;
      default:
        logger.log(LogLevel.error, ipAddr + ' - unknown command ' + msg.command);
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
