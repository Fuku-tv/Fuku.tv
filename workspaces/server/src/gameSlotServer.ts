import { LogLevel, LoggerClass, env } from 'fuku.tv-shared';
import { redisSubscriber, redisPublisher }  from './common/redis';

const logger = new LoggerClass('GameSlotServer');

logger.lofIngo(`GameSlotServer current stage: ${env.getStage()}`);

export class GameSlotServer {
  async run(): Promise<void> {

    redisSubscriber.on('connect', () => {
      logger.logInfo( `redisSubscriber connected.`);
    });

    redisPublisher.on('connect', () => {
      logger.logInfo(`redisPublisher connected`);
    });

    redisSubscriber.on('message', (channel: any, data: any) => {
      const { message } = JSON.parse(data);
      if (channel === 'gameSlotGetRNG') {
        // generate the random slots
        var rngArray = [];

        for (var i = 0; i < message.num; i++) {
          var rng = Math.floor(Math.random() * (10 - 0) + 0);
          rngArray.push(rng);
        }

        logger.logInfo(`Generated ${message.num} RNG for ${message.user}: `);
        // flag wins
        redisPublisher.publish('gameSlotRNGResults', JSON.stringify({
          message: { num: message.num, result: rngArray }
        }));
      }
    })

    redisSubscriber.subscribe('gameSlotGetRNG');
  }
}

export default GameSlotServer;
