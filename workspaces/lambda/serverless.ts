import type { Serverless } from 'serverless/aws';

import { devDependencies } from './package.json';

// get the stage option from arguments
// eslint-disable-next-line no-template-curly-in-string
const STAGE = '${opt:stage}';

const frameworkVersion = devDependencies.serverless;

const serverlessConfiguration: Serverless = {
  frameworkVersion,

  service: 'fuku-serverless',
  configValidationMode: 'error',
  provider: {
    apiGateway: {
      shouldStartNameWithService: true,
    },
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: STAGE,
    region: 'us-east-1',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['dynamodb:*'],
        Resource: '*',
      },
    ],
  },
  plugins: ['serverless-plugin-typescript', 'serverless-dynamodb-local', 'serverless-offline', 'serverless-plugin-monorepo'],

  functions: {
    webhook_stripe: {
      handler: 'src/http/handler.stripeWebhook',
      events: [
        {
          http: {
            path: '/webhooks/stripe',
            method: 'post',
          },
        },
      ],
    },
    index: {
      handler: 'src/http/handler.index',
      events: [
        {
          http: {
            path: '/',
            method: 'get',
          },
        },
      ],
    },
  },
};

// serverless doesnt support 'export default' syntax;
module.exports = serverlessConfiguration;
