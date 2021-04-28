import { getSecrets, Secrets, getSecret } from '.';

export const stripeApiKey = async (): Promise<string> => {
  try {
    return (await getSecrets()).STRIPE_API_KEY;
  } catch (error) {
    console.log(process.env.STRIPE_API_KEY);
    return (
      process.env.STRIPE_API_KEY || 'pk_test_51HxGG6Gx8BmO5evBcDbYjClczRZa0rC96ZiA3ZFyn5ErewXeH2TgAs9cseKW6mT1mMpfRepbtbXEgrPEWovaHbn100wlrLXvff'
    );
  }
};

export const stripeApiSecret = async (): Promise<string> => {
  try {
    return (await getSecrets()).STRIPE_API_SECRET;
  } catch (error) {
    console.log(process.env.STRIPE_API_SECRET);
    return (
      process.env.STRIPE_API_SECRET || 'rk_test_51HxGG6Gx8BmO5evBLmxbuvgdsXyOf6BJLQKlzl5lEzFTBi1lUFixP09FJ6dPZUeWXzjn2cTF73zDVnTjGQEOqcH300qsohCbx9'
    );
  }
};

export const stripeWebhookSecret = async (): Promise<string> => (await getSecrets()).STRIPE_WEBHOOK_SECRET;

export const amazonGiftCardKey = async (): Promise<string> => (await getSecrets()).AMAZON_GIFTCARD_KEY;

export const amazonGiftCardSecret = async (): Promise<string> => (await getSecrets()).AMAZON_GIFTCARD_SECRET;
