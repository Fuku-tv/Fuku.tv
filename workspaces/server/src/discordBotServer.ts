import { LogLevel, LoggerClass, env } from 'fuku.tv-shared';
import { getDiscordClient, getWebhookClient, WebhookClient } from 'fuku.tv-shared/discord';
import { discordBotToken } from 'fuku.tv-shared/secrets/getSecret';
import { redisSubscriber, redisPublisher } from './common/redis';

const logger = new LoggerClass('discordBot');

logger.logInfo(`Discord current stage: ${env.getStage()}`);

export class DiscordBotServer {
  discordClient = getDiscordClient();

  webhookClient: WebhookClient;

  isOnline = false;

  constructor() {
    this.loadSecrets().then().catch();
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
          this.webhookClient.send(`${message.username} just scored ${message.points} points!`, { username: 'Points! Oh Yeah!' });
          redisPublisher.publish(
            'chatmessage',
            JSON.stringify({ message: { username: 'Points! Oh Yeah!', chatmessage: `${message.username} just scored ${message.points} points!` } })
          );
        } else {
          this.webhookClient.send(`${message.username} WON THE ${message.points} POINT JACKPOT!`, { username: 'JACKPOT WINNER!' });
          redisPublisher.publish(
            'chatmessage',
            JSON.stringify({
              message: { username: 'JACKPOT WINNER!', chatmessage: `${message.username} WON THE ${message.points} POINT JACKPOT!` },
            })
          );
        }
      }
    });
    redisSubscriber.subscribe('discordmessage');
    redisSubscriber.subscribe('prizemessage');

    this.discordClient.on('ready', () => {
      logger.log(LogLevel.info, 'Discord ready.');
    });
    this.discordClient.on('message', (msg) => {
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

  /**
   * juryrig because parcel 2 doesnt support top level await
   */
  async loadSecrets(): Promise<void> {
    const DISCORD_TOKEN = await discordBotToken();
    this.webhookClient = await getWebhookClient();
    this.discordClient
      .login(DISCORD_TOKEN)
      .then(() => {
        logger.logInfo('Discord bot logged in');
        this.isOnline = true;
      })
      .catch((error: any) => {
        logger.logError(`Error logging into discord with bot: ${error}`);
      });
  }
}

export default DiscordBotServer;
