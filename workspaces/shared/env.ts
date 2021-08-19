export const fukuOauthRedirectURL = (): string => {
  if (process.env.NODE_ENV === 'development') {
    // Local Development
    return 'http://localhost:10888/oauth/redirect';
  }
  if (process.env.EB_ENVIRONMENT !== 'production') {
    // Dev Environment
    return 'https://dev.fuku.tv/oauth/redirect';
  }
  // Prod Environment
  return 'https://prod.fuku.tv/oauth/redirect';
};

export const fukuControllerServerURL = (): string => {
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

export const fukuVideoServerURL = (): string => {
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
  if (process.env.NODE_ENV === 'development' || process.env.LAMBDA_ENV === 'local') {
    // Local Development
    return 'local';
  }
  if (process.env.EB_ENVIRONMENT !== 'production' && process.env.LAMBDA_ENV !== 'prod') {
    // Dev Environment
    return 'dev';
  }
  // Prod Environment
  return 'prod';
};

export const fukuApiServerURL = (): string => {
  if (process.env.NODE_ENV === 'development') {
    // Local Development
    return 'http://localhost:3000/local';
  }
  if (process.env.EB_ENVIRONMENT !== 'production') {
    // Dev Environment
    return 'https://api-dev.fuku.tv';
  }
  // Prod Environment
  return 'https://api.fuku.tv';
};

export const fukuRedisServerURL = (): string => {
  if (process.env.NODE_ENV === 'development' || process.env.REDIS_LOCAL === 'true') {
    // Local Development
    return '127.0.0.1';
  }
  if (process.env.EB_ENVIRONMENT !== 'production') {
    // Dev Environment
    return 'fuku-cache.jtlxqc.ng.0001.use1.cache.amazonaws.com';
  }
  // Prod Environment
  return 'fuku-cache-prod.jtlxqc.ng.0001.use1.cache.amazonaws.com';
};

export const amazonGiftCardURL = (): string => {
  if (process.env.EB_ENVIRONMENT !== 'production' || process.env.LAMBDA_ENV !== 'prod') {
    // Dev Environment
    return 'agcod-v2-gamma.amazon.com';
  }
  // Prod Environment
  return 'agcod-v2.amazon.com';
};

export const piControllerURL = (): string => {
  if (process.env.EB_ENVIRONMENT !== 'production' || process.env.LAMBDA_ENV !== 'prod') {
    // Dev Environment
    return 'ws://96.61.12.109:10777';
  }
  // Prod Environment
  // TODO get production URL from elasticache
  return 'ws://96.61.12.109:10777';
};

export const piVideoURL = (): [string, string] => {
  if (process.env.EB_ENVIRONMENT !== 'production' || process.env.LAMBDA_ENV !== 'prod') {
    // Dev Environment
    // return ['ws://96.61.12.109:10781', 'ws://96.61.12.109:10782'];
    return ['ws://96.61.12.109:10778', 'ws://96.61.12.109:10779'];
  }
  // Prod Environment
  // TODO get production URL from elasticache
  return ['ws://96.61.12.109:10778', 'ws://96.61.12.109:10779'];
};
