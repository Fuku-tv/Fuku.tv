import type { App } from '@serverless-stack/resources';
import WebsiteStack from './WebsiteStack';

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: 'nodejs16.x',
    srcPath: 'backend',
    bundle: {
      format: 'esm',
    },
  });
  if (app.stage === 'dev') {
    app.setDefaultRemovalPolicy('destroy');
  }

  app.stack(WebsiteStack, {
    description: 'Fuku Stack - generated by serverless-stack',
  });
}