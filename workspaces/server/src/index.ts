import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import RedisServer from 'redis-server';
import { initializeDatabase } from 'fuku.tv-shared/dynamodb';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { env, LoggerClass, LogLevel } from 'fuku.tv-shared';
import { getStage } from 'fuku.tv-shared/env';
import { ControllerServer } from './viewerControllerServer';
import { VideoServer } from './viewerVideoServer';
import { DiscordBotServer } from './discordBotServer';

const STAGE = getStage();

Sentry.init({
  dsn: 'https://8f21c8e02cd3459a9065aa5311bde86f@o879857.ingest.sentry.io/5832909',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// const privateKey = fs.readFileSync(path.resolve(__dirname, '../certs/key.pem'), 'utf8');
// const certificate = fs.readFileSync(path.resolve(__dirname, '../certs/cert.pem'), 'utf8');
// const credentials = {
//   key: privateKey,
//   cert: certificate,
// };

const logger = new LoggerClass('server');

initializeDatabase()
  .then(() => {
    logger.log(LogLevel.info, `Database Initialization Completed - ${STAGE}`);
  })
  .catch((err) => {
    logger.log(LogLevel.error, `Database Initialization Failed - ${err}`);
  });

// scaffold local redis server if not in a production environment
if (process.env.NODE_ENV === 'development' || process.env.REDIS_LOCAL === 'true') {
  // Simply pass the port that you want a Redis server to listen on.
  const server = new RedisServer({
    port: 6379,
    conf: path.join(__dirname, '../bin/redis.conf'),
    bin: path.join(__dirname, '../bin/redis-server.exe'),
  });

  server.open((err) => {
    if (err === null) {
      logger.logInfo('Local Redis Server running');
      // You may now connect a client to the Redis
      // server bound to port 6379.
    }
  });
}

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

const video = new VideoServer(videoHttpsServer);
const controller = new ControllerServer(controllerHttpsServer);
const discord = new DiscordBotServer();
