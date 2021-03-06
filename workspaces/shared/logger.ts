import winston from 'winston';
import winstondrf from 'winston-daily-rotate-file';

export const LogLevel = {
  info: 'info',
  error: 'error',
};

export class LoggerClass {
  logger: any;

  constructor(name: string) {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:SS' }),
        winston.format.align(),
        winston.format.printf((info: any) => `${info.timestamp} ${info.level}: ${info.message}`)
      ),
      transports: [
        new winstondrf({
          json: false,
          filename: `logs/${name}.log`,
          datePattern: 'YYY-MM-DD',
          zippedArchive: false,
          maxFiles: '90d',
          level: 'verbose',
        }),
        new winston.transports.Console({ level: 'info' }),
      ],
    });
  }

  log(level: string, message: string) {
    if (level === LogLevel.info) this.logger.info(message);
    else if (level === LogLevel.error) this.logger.error(message);
    else this.logger.info(message);
  }
}
