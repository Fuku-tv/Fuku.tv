export const FukuControllerServerURL = (): string => {
  let URL: string;
  if (process.env.NODE_ENV === 'development') {
    // Local Development
    URL = 'ws://localhost:10888';
  } else if (process.env.EB_ENVIRONMENT !== 'production') {
    // Dev Environment
    URL = 'wss://dev.fuku.tv/controller';
  } else {
    // Prod Environment
    URL = 'wss:/prod.fuku.tv/controller';
  }

  return URL;
};

export const FukuVideoServerURL = (): string => {
  let URL: string;

  if (process.env.NODE_ENV === 'development') {
    // Local Development
    URL = 'ws://localhost:10889';
  } else if (process.env.EB_ENVIRONMENT !== 'production') {
    // Dev Environment
    URL = 'wss://dev.fuku.tv/video';
  } else {
    // Prod Environment
    URL = 'wss:/prod.fuku.tv/video';
  }

  return URL;
};
