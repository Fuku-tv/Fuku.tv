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
  custom: {
    bundle: { sourcemaps: false, linting: false, fixPackages: ['formidable@1.x'] },
  },
  provider: {
    lambdaHashingVersion: 20201221,
    apiGateway: {
      shouldStartNameWithService: true,
    },
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: STAGE,
    environment: {
      LAMBDA_ENV: STAGE,
    },
    region: 'us-east-1',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['dynamodb:*', 'ses:*', 'secretsmanager:*'],
        Resource: '*',
      },
    ],
  },
  plugins: ['serverless-bundle', 'serverless-dynamodb-local', 'serverless-offline'],

  functions: {
    update_freeplay: {
      handler: 'src/trigger/scheduled/updateFreeplay.index',
      events: [
        {
          schedule: {
            rate: 'rate(4 hours)',
          },
        },
      ],
    },
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
    giftcard: {
      handler: 'src/http/giftCard.index',
      events: [
        {
          http: {
            path: '/giftcard',
            method: 'post',
            cors: true,
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
