import * as Discord from 'discord.js';
import { discordBotToken, discordWebhookId, discordWebhookToken } from '../secrets/getSecret';

const DEBUG_ID = '883076818834432083';
const DEBUG_TOKEN = 'PffbvPN07wOKxcaXln99W0FMZoMfdyrXZOY2ARf5Gi8UKaGaB-l_mwQGAKXdF1XZE1VD';

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

export const getDebugWebhookClient = async (): Promise<Discord.WebhookClient> => new Discord.WebhookClient(DEBUG_ID, DEBUG_TOKEN);

export type WebhookClient = Discord.WebhookClient;

export type DiscordClient = Discord.Client;
