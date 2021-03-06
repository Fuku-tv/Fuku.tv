import onoff from 'onoff';
import { Serial } from 'raspi-serial';
import { LogLevel, LoggerClass, constants } from 'fuku.tv-shared';

const logger = new LoggerClass('prizeServer');

const serial = new Serial();
const gpio = onoff.Gpio;

const ioPin = new gpio(19, 'in', 'both');

let lastVal = 0;

ioPin.watch((err: any, val: any) => {
  if (err) {
    logger.log(LogLevel.error, 'ioPin error: ' + err);
    return;
  }
  if (val === 1 && lastVal === 0) {
    logger.log(LogLevel.info, 'prize get');
    serial.write('1');
    lastVal = val;
  }
  else lastVal = 0;
});
