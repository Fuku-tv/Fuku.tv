import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { getStage } from '../env';

export interface Secrets {
  STRIPE_API_KEY: string;
  STRIPE_API_SECRET: string;
  STRIPE_WEBHOOK_SECRET: string;
  AMAZON_GIFTCARD_KEY: string;
  AMAZON_GIFTCARD_SECRET: string;
  DISCORD_BOT_TOKEN: string;
  DISCORD_WEBHOOK_ID: string;
  DISCORD_WEBHOOK_TOKEN: string;
}

const region = 'us-east-1';

const STAGE = getStage();

const SECRET_NAME = STAGE === 'prod' ? 'Fuku.tv-Production-Secrets' : 'Fuku.tv-Development-Secrets';

// Create a Secrets Manager client
const client = new SecretsManagerClient({
  region,
});

// In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
// See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
// We rethrow the exception by default.

export const getSecrets = async (): Promise<Secrets> => {
  try {
    const test = await client.send(new GetSecretValueCommand({ SecretId: SECRET_NAME }));
    return JSON.parse(test.SecretString);
  } catch (error) {
    throw new Error(error);
  }
};

export const getSecret = (key: keyof Secrets): string => 'test';
