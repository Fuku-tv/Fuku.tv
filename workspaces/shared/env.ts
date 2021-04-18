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

export const amazonGiftCardURL = (): string => {
  if (process.env.EB_ENVIRONMENT !== 'production' || process.env.LAMBDA_ENV !== 'prod') {
    // Dev Environment
    return 'agcod-v2-gamma.amazon.com';
  }
  // Prod Environment
  // TODO get production URL from elasticache
  return 'agcod-v2.amazon.com';
};
