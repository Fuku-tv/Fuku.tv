export const FukuControllerServerURL = (): string => {
  let URL: string;
  if (process.env.NODE_ENV === 'development') {
    // Local Development
    URL = 'ws://localhost:10888';
    console.log('local hit');
  } else if (process.env.EB_ENVIRONMENT !== 'production') {
    // Dev Environment
    URL = 'wss://dev.fuku.tv/controller';
  } else {
    // Prod Environment
    URL = 'wss://alpha.fuku.tv:10888';
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
    URL = 'wss://alpha.fuku.tv:10889';
  }

  return URL;
};
