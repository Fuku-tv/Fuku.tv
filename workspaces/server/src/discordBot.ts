import { LogLevel, LoggerClass, env } from 'fuku.tv-shared';
import * as redis from 'redis';

import * as Discord from 'discord.js';

const DISCORD_TOKEN = 'ODQ5Njk4ODc2OTEwMjA2OTk3.YLe9vg.Yuwf32Ge2dFxw1ev92BZ6WygQqU';
const DISCORD_CHANNEL_ID_DEBUG = '850164433111089152';
const WEBHOOK_ID = '850164581191909388';
const WEBHOOK_TOKEN = 'WUNxSKL9alhcWf4pOmaXInvRgl5XsH4fZjYMftzWPzrfXDk8sxTS9g9OhM-5jESh6nGJ';
const logger = new LoggerClass('discordBot');
const FUKU_REDIS_URL = env.fukuRedisServerURL();

export class DiscordBot {
  discordClient = new Discord.Client();

  redisSubscriber = redis.createClient(6379, FUKU_REDIS_URL);

  redisPublisher = redis.createClient(6379, FUKU_REDIS_URL);

  webhookClient = new Discord.WebhookClient(WEBHOOK_ID, WEBHOOK_TOKEN);

  isOnline = false;

  constructor() {
    this.redisSubscriber.on('connect', () => {
      logger.log(LogLevel.info, 'Redis connected.');
    });

    this.redisPublisher.on('connect', () => {
      logger.log(LogLevel.info, 'redisPublisher connected.');
    });

    this.redisSubscriber.on('message', (channel: any, data: any) => {
      const { message } = JSON.parse(data);
      console.log(`discordbot got message: ${message}`);
      console.log(`this.isonline: ${this.isOnline}`);
      if (this.isOnline === true) {
        this.webhookClient.send(message.chatmessage, {
          username: message.username,
        });
      }
    });
    this.redisSubscriber.subscribe('discordmessage');

    this.discordClient
      .login(DISCORD_TOKEN)
      .then(() => {
        logger.logInfo('Discord bot logged in');
        this.isOnline = true;
      })
      .catch((error: any) => {
        logger.logError(`Error logging into discord with bot: ${error}`);
      });
    this.discordClient.on('ready', () => {
      logger.log(LogLevel.info, 'Discord ready.');
    });
    this.discordClient.on('message', (msg: Discord.Message) => {
      if (msg.content.startsWith('!')) {
        const commandBody = msg.content.slice(1);
        const args = commandBody.split(' ');
        const command = args.shift().toLowerCase();
        if (command === 'dance') {
          msg.channel.send(':D\\-<');
          msg.channel.send(':D|-<');
          msg.channel.send(':D/-<');
          this.redisPublisher.publish('chatmessage', JSON.stringify({ message: { username: 'Fukutv Bot', chatmessage: ':D\\-<' } }), () => {});
          this.redisPublisher.publish('chatmessage', JSON.stringify({ message: { username: 'Fukutv Bot', chatmessage: ':D|-<' } }), () => {});
          this.redisPublisher.publish('chatmessage', JSON.stringify({ message: { username: 'Fukutv Bot', chatmessage: ':D/-<' } }), () => {});
        }
      } else {
        this.redisPublisher.publish(
          'chatmessage',
          JSON.stringify({ message: { username: msg.author.username, chatmessage: msg.content } }),
          () => {}
        );
      }
    });
  }
}

export default DiscordBot;
