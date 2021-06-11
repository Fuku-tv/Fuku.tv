import { LogLevel, LoggerClass, env } from 'fuku.tv-shared';
import * as Discord from 'discord.js';
import { redisSubscriber, redisPublisher } from './common/redis';

const DISCORD_TOKEN = 'ODQ5Njk4ODc2OTEwMjA2OTk3.YLe9vg.Yuwf32Ge2dFxw1ev92BZ6WygQqU';
const WEBHOOK_ID = env.getStage() === 'prod' ? '852536906100637757' : '850164581191909388';
const WEBHOOK_TOKEN =
  env.getStage() === 'prod'
    ? 'ztlF46Nj-1GOZiiGIgj2DZdYiiUBU8bmEHG1m_wjB1PHn_jtyuV4PQDkonvb7jwHLokD'
    : 'WUNxSKL9alhcWf4pOmaXInvRgl5XsH4fZjYMftzWPzrfXDk8sxTS9g9OhM-5jESh6nGJ';
const logger = new LoggerClass('discordBot');

logger.logInfo(`Discord current stage: ${env.getStage()}`);

export class DiscordBot {
  discordClient = new Discord.Client();

  webhookClient = new Discord.WebhookClient(WEBHOOK_ID, WEBHOOK_TOKEN);

  isOnline = false;

  constructor() {
    redisSubscriber.on('connect', () => {
      logger.log(LogLevel.info, 'Redis connected.');
    });

    redisPublisher.on('connect', () => {
      logger.log(LogLevel.info, 'redisPublisher connected.');
    });

    redisSubscriber.on('message', (channel: any, data: any) => {
      if (this.isOnline === false) {
        return;
      }

      const { message } = JSON.parse(data);
      if (channel === 'discordmessage') {
        this.webhookClient.send(message.chatmessage, {
          username: message.username,
        });
      } else if (channel === 'prizemessage') {
        if (message.jackpot === false) {
          this.webhookClient.send(`${message.username} just scored ${message.points}!`, { username: 'Points! Oh Yeah!' });
          redisPublisher.publish(
            'chatmessage',
            JSON.stringify({ message: { username: 'Points! Oh Yeah!', chatmessage: `${message.username} just scored ${message.points}!` } })
          );
        } else {
          this.webhookClient.send(`${message.username} WON THE ${message.points} POINT JACKPOT!`, { username: 'JACKPOT WINNER!' });
          redisPublisher.publish(
            'chatmessage',
            JSON.stringify({ message: { username: 'JACKPOT WINNER!', chatmessage: `${message.username} WON THE ${message.points} POINT JACKPOT!` } })
          );
        }
      }
    });
    redisSubscriber.subscribe('discordmessage');
    redisSubscriber.subscribe('prizemessage');

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
      if (msg.author.bot) {
        return;
      }
      if (msg.content.startsWith('!')) {
        const commandBody = msg.content.slice(1);
        const args = commandBody.split(' ');
        const command = args.shift().toLowerCase();
        if (command === 'dance') {
          this.chat('Fukutv Bot', ':D\\\\-<');
          this.chat('Fukutv Bot', ':D|-<');
          this.chat('Fukutv Bot', ':D/-<');
        }
      } else {
        redisPublisher.publish('chatmessage', JSON.stringify({ message: { username: msg.author.username, chatmessage: msg.content } }), () => {});
      }
    });
  }

  chat(username: any, message: any) {
    this.webhookClient.send(message, { username });
    redisPublisher.publish('chatmessage', JSON.stringify({ message: { username, chatmessage: message } }));
  }
}

export default DiscordBot;
