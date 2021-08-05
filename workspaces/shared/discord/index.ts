import * as Discord from 'discord.js';
import { discordBotToken, discordWebhookId, discordWebhookToken } from '../secrets/getSecret';

export const getDiscordClient = async (): Promise<Discord.Client> => {
  const client = new Discord.Client();
  client.login(await discordBotToken());
  return client;
};

export const getWebhookClient = async (): Promise<Discord.WebhookClient> => {
  const WEBHOOK_ID = await discordWebhookId();
  const WEBHOOK_TOKEN = await discordWebhookToken();
  return new Discord.WebhookClient(WEBHOOK_ID, WEBHOOK_TOKEN);
};

export type WebhookClient = Discord.WebhookClient;

export type DiscordClient = Discord.Client;
