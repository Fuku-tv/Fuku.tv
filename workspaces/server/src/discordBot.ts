import { LogLevel, LoggerClass, env } from 'fuku.tv-shared';
import * as redis from 'redis';
import * as Discord from 'discord.js';

const DISCORD_TOKEN = 'ODQ5Njk4ODc2OTEwMjA2OTk3.YLe9vg.Yuwf32Ge2dFxw1ev92BZ6WygQqU';

const logger = new LoggerClass('discordBot');
const FUKU_REDIS_URL = env.fukuRedisServerURL();

export class DiscordBot {
  discordClient: any = new Discord.Client();

  redisClient: any = redis.createClient(6379, FUKU_REDIS_URL);

  constructor() {
    this.redisClient.on('connect', () => {
      logger.log(LogLevel.info, 'Redis connected.');
    });

    this.discordClient.login(DISCORD_TOKEN);
    this.discordClient.on('ready', () => {
      logger.log(LogLevel.info, 'Discord ready.');
    });
    this.discordClient.on('message', (msg: Discord.Message) => {
      if (msg.content === 'ping') {
        msg.channel.send('pong');
        return;
      }
      this.redisClient.publish('chatmessage', `{'message':{'username':'${msg.author.username}','chatmessage':'${msg.content}'}`, () => {});
    });
  }
}

export default DiscordBot;
