import { LogLevel, LoggerClass, env } from 'fuku.tv-shared';
import * as redis from 'redis';
import * as redisPub from 'redis';

import * as Discord from 'discord.js';

const DISCORD_TOKEN = 'ODQ5Njk4ODc2OTEwMjA2OTk3.YLe9vg.Yuwf32Ge2dFxw1ev92BZ6WygQqU';
const DISCORD_CHANNEL_ID_DEBUG = '850164433111089152';
const logger = new LoggerClass('discordBot');
const FUKU_REDIS_URL = env.fukuRedisServerURL();

export class DiscordBot {
  discordClient = new Discord.Client();

  redisSubscriber: any = redis.createClient(6379, FUKU_REDIS_URL);

  redisPublisher: any = redisPub.createClient(6379, FUKU_REDIS_URL);

  isonline: boolean = false;

  constructor() {
    this.redisSubscriber.on('connect', () => {
      logger.log(LogLevel.info, 'Redis connected.');
    });

    this.redisPublisher.on('connect', () => {
      logger.log(LogLevel.info, 'redisPublisher connected.');
    });

    this.redisSubscriber.on('message', (channel: any, message: any) => {
      console.log('discordbot got message: ' + message);
      console.log('this.isonline: ' + this.isonline);
      if (this.isonline === true) {
        this.discordClient.cache.get(DISCORD_CHANNEL_ID_DEBUG).send(message.username + ': ' + message.chatmessage);
      }
    });
    this.redisSubscriber.subscribe('discordmessage');

    this.discordClient
      .login(DISCORD_TOKEN)
      .then(() => {
        logger.logInfo('Discord bot logged in');
        this.isonline = true
      })
      .catch((error: any) => {
        logger.logError(`Error logging into discord with bot: ${error}`);
      });
    this.discordClient.on('ready', () => {
      logger.log(LogLevel.info, 'Discord ready.');
    });
    this.discordClient.on('message', (msg: Discord.Message) => {
      if (msg.content === 'ping') {
        msg.channel.send('pong');
        return;
      }

      this.redisPublisher.publish('chatmessage', `{'message':{'username':'${msg.author.username}','chatmessage':'${msg.content}'}`, () => {});
    });
  }
}

export default DiscordBot;
