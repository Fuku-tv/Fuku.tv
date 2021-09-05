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
    bundle: {
      // exclude discord.js due to lack of webpack support.
      sourcemaps: false,
      packager: 'yarn',
      externals: ['discord.js'],
      linting: false,
      fixPackages: ['formidable@1.x'],
    },
  },
  provider: {
    lambdaHashingVersion: 20201221,
    apiGateway: {
      shouldStartNameWithService: true,
    },
    name: 'aws',
    runtime: 'nodejs14.x',
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
    authorization: {
      handler: 'src/http/authorizer.index',
    },
    user: {
      handler: 'src/http/user.index',
      events: [
        {
          http: {
            path: '/user',
            method: 'get',
            cors: true,
            authorizer: { name: 'authorization' },
          },
        },
      ],
    },
    update_user: {
      handler: 'src/http/user.update',
      events: [
        {
          http: {
            path: '/user',
            method: 'post',
            cors: true,
          },
        },
      ],
    },
    update_freeplay: {
      handler: 'src/trigger/scheduled/updateFreeplay.index',
      events: [
        {
          http: {
            path: '/trigger/updateFreeplay',
            method: 'post',
          },
        },
        {
          schedule: {
            rate: 'rate(8 hours)',
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
    leaderboard: {
      handler: 'src/http/leaderboard.index',
      events: [
        {
          http: {
            path: '/leaderboard',
            method: 'get',
            cors: true,
          },
        },
      ],
    },
    checkout: {
      handler: 'src/http/stripe.checkout',
      events: [
        {
          http: {
            path: '/checkout',
            method: 'post',
            cors: true,
          },
        },
      ],
    },
    products: {
      handler: 'src/http/stripe.products',
      events: [
        {
          http: {
            path: '/products',
            method: 'get',
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
