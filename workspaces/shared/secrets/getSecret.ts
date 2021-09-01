import { getSecrets, Secrets, getSecret } from '.';

export const stripeApiKey = async (): Promise<string> => (await getSecrets()).STRIPE_API_KEY;

export const stripeApiSecret = async (): Promise<string> => (await getSecrets()).STRIPE_API_SECRET;

export const stripeWebhookSecret = async (): Promise<string> => (await getSecrets()).STRIPE_WEBHOOK_SECRET;

export const amazonGiftCardKey = async (): Promise<string> => (await getSecrets()).AMAZON_GIFTCARD_KEY;

export const amazonGiftCardSecret = async (): Promise<string> => (await getSecrets()).AMAZON_GIFTCARD_SECRET;

export const discordBotToken = async (): Promise<string> => (await getSecrets()).DISCORD_BOT_TOKEN;

export const discordWebhookId = async (): Promise<string> => (await getSecrets()).DISCORD_WEBHOOK_ID;

export const discordWebhookToken = async (): Promise<string> => (await getSecrets()).DISCORD_WEBHOOK_TOKEN;
