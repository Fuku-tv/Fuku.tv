import { LogLevel, LoggerClass, env } from 'fuku.tv-shared';
import type { WebhookClient, DiscordClient } from 'fuku.tv-shared/discord';
import { getDebugWebhookClient, getDiscordClient, getWebhookClient } from 'fuku.tv-shared/discord';
import { redisSubscriber, redisPublisher } from './common/redis';

const logger = new LoggerClass('discordBot');

logger.logInfo(`Discord current stage: ${env.getStage()}`);

const AVATAR_URL = 'https://drive.google.com/thumbnail?id=11iu7MqSvByvalZ-ZUyMag0WJXXAKT3Uk';

export class DiscordBotServer {
  discordClient: DiscordClient;

  webhookClient: WebhookClient;

  debugWebhookClient: WebhookClient;

  isOnline = false;

  async run(): Promise<void> {
    try {
      this.webhookClient = await getWebhookClient();
      this.discordClient = await getDiscordClient();

      this.debugWebhookClient = await getDebugWebhookClient();
      this.isOnline = true;
      logger.logInfo('Discord bot logged in');
    } catch (error) {
      logger.logError(`Error logging into discord with bot: ${error}`);
    }

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
          avatarURL: message?.pictureUrl,
        });
      } else if (channel === 'prizemessage') {
        if (message.jackpot === false) {
          this.webhookClient.send(`${message.username} just scored ${message.points} points!`, {
            username: 'Points! Oh Yeah!',
            avatarURL: AVATAR_URL,
          });
          redisPublisher.publish(
            'chatmessage',
            JSON.stringify({ message: { username: 'Points! Oh Yeah!', chatmessage: `${message.username} just scored ${message.points} points!` } })
          );
        } else {
          this.webhookClient.send(`${message.username} WON THE ${message.points} POINT JACKPOT!`, {
            username: 'JACKPOT WINNER!',
            avatarURL: AVATAR_URL,
          });
          redisPublisher.publish(
            'chatmessage',
            JSON.stringify({
              message: { username: 'JACKPOT WINNER!', chatmessage: `${message.username} WON THE ${message.points} POINT JACKPOT!` },
            })
          );
        }
        this.debugWebhookClient.send(`Player ${message.username} has earned ${message.points} Points`);
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

  chat(username: any, message: any): void {
    this.webhookClient.send(message, { username });
    redisPublisher.publish('chatmessage', JSON.stringify({ message: { username, chatmessage: message } }));
  }
}

export default DiscordBotServer;
