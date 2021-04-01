import { getSecrets } from 'fuku.tv-shared/secrets';

export const FukuControllerServerURL = (): string => {
  if (process.env.NODE_ENV === 'development') {
    // Local Development
    return 'ws://localhost:10888';
  }
  if (process.env.EB_ENVIRONMENT !== 'production') {
    // Dev Environment
    return 'wss://dev.fuku.tv/controller';
  }
  // Prod Environment
  return 'wss://prod.fuku.tv/controller';
};

export const FukuVideoServerURL = (): string => {
  if (process.env.NODE_ENV === 'development') {
    // Local Development
    return 'ws://localhost:10889';
  }
  if (process.env.EB_ENVIRONMENT !== 'production') {
    // Dev Environment
    return 'wss://dev.fuku.tv/video';
  }
  // Prod Environment
  return 'wss://prod.fuku.tv/video';
};

/**
 * Gets the current stage of the application
 */
export const getStage = (): string => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local') {
    // Local Development
    return 'local';
  }
  if (process.env.EB_ENVIRONMENT !== 'production') {
    // Dev Environment
    return 'dev';
  }
  // Prod Environment
  return 'prod';
};

export const FukuApiServerURL = (): string => {
  if (process.env.NODE_ENV === 'development') {
    // Local Development
    return 'http://localhost:3000';
  }
  if (process.env.EB_ENVIRONMENT !== 'production') {
    // Dev Environment
    return 'https://api-dev.fuku.tv';
  }
  // Prod Environment
  return 'https://api.fuku.tv';
};

export const FukuRedisServerURL = (): string => {
  if (process.env.NODE_ENV === 'development') {
    // Local Development
    return '127.0.0.1';
  }
  if (process.env.EB_ENVIRONMENT !== 'production') {
    // Dev Environment
    return 'fuku-cache.jtlxqc.ng.0001.use1.cache.amazonaws.com';
  }
  // Prod Environment
  // TODO get production URL from elasticache
  return 'fuku-cache.jtlxqc.ng.0001.use1.cache.amazonaws.com';
};

export const StripeApiKey = (): string => {
  let value: string;
  // check for live key in ENV
  if (process.env.EB_ENVIRONMENT === 'production') {
    getSecrets().then((data) => {
      value = data.STRIPE_API_KEY;
    });
    return value;
  }
  // return default test key
  return 'pk_test_51HxGG6Gx8BmO5evBcDbYjClczRZa0rC96ZiA3ZFyn5ErewXeH2TgAs9cseKW6mT1mMpfRepbtbXEgrPEWovaHbn100wlrLXvff';
};

export const StripeApiSecret = (): string => {
  let value: string;
  // check for live key in ENV
  if (process.env.EB_ENVIRONMENT === 'production') {
    getSecrets().then((data) => {
      value = data.STRIPE_API_SECRET;
    });
    return value;
  }
  // return test secret
  return 'rk_test_51HxGG6Gx8BmO5evBLmxbuvgdsXyOf6BJLQKlzl5lEzFTBi1lUFixP09FJ6dPZUeWXzjn2cTF73zDVnTjGQEOqcH300qsohCbx9';
};

export const StripeWebhookSecret = (): string => {
  let value: string;
  // check for live key in ENV
  if (process.env.EB_ENVIRONMENT === 'production') {
    getSecrets().then((data) => {
      value = data.STRIPE_WEBHOOK_SECRET;
    });
    return value;
  }
  // return test secret
  return 'whsec_HBf2DDCg0jGYhdrJ4smIGkDUuFAZ8Wd8';
};
