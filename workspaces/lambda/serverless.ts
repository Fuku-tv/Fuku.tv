import type { Serverless } from 'serverless/aws';

import { devDependencies } from './package.json';

// get the stage option from arguments
// eslint-disable-next-line no-template-curly-in-string
const STAGE = '${opt:stage}';

const frameworkVersion = devDependencies.serverless;

const serverlessConfiguration: Serverless = {
  frameworkVersion,

  custom: {
    webpack: {
      packager: 'yarn',
    },
  },
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
  plugins: ['serverless-dynamodb-local', 'serverless-offline', 'serverless-webpack'],

  functions: {
    webhook_stripe: {
      handler: 'src/http/webhook/stripe.index',
      events: [
        {
          http: {
            path: '/webhook/stripe',
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
// quick fix for type error when deploying on AWS
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
module.exports = serverlessConfiguration;
