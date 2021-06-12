import * as Discord from 'discord.js';
import { discordWebhookId, discordWebhookToken } from '../secrets/getSecret';

export const getDiscordClient = (): Discord.Client => new Discord.Client();

export const getWebhookClient = async (): Promise<Discord.WebhookClient> => {
  const WEBHOOK_ID = await discordWebhookId();
  const WEBHOOK_TOKEN = await discordWebhookToken();
  return new Discord.WebhookClient(WEBHOOK_ID, WEBHOOK_TOKEN);
};

export type WebhookClient = Discord.WebhookClient;
