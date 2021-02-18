import type { Serverless } from 'serverless/aws';

import { devDependencies } from './package.json';

// get the stage option from arguments
// eslint-disable-next-line no-template-curly-in-string
const STAGE = '${opt:stage}';

const PLAYERS_TABLE = `${STAGE}_Players`;
const GAMES_TABLE = `${STAGE}_Games`;

const AWS_DYMANODB_TABLE = 'AWS::DynamoDB::Table';

const frameworkVersion = devDependencies.serverless;

enum BillingMode {
  PAY_PER_REQUEST = 'PAY_PER_REQUEST',
}

const serverlessConfiguration: Serverless = {
  frameworkVersion,

  service: 'fuku-serverless',
  configValidationMode: 'error',
  provider: {
    apiGateway: {
      shouldStartNameWithService: true,
    },
    environment: {
      playersTable: PLAYERS_TABLE,
      gamesTable: GAMES_TABLE,
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
  plugins: ['serverless-plugin-typescript', 'serverless-dynamodb-local', 'serverless-offline'],

  functions: {
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
    test: {
      handler: 'src/http/handler.test',
      events: [
        {
          http: {
            path: '/test',
            method: 'get',
          },
        },
      ],
    },
  },

  resources: {
    Resources: {
      PlayersTable: {
        Type: AWS_DYMANODB_TABLE,
        Properties: {
          TableName: PLAYERS_TABLE,
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
          ],
          BillingMode: BillingMode.PAY_PER_REQUEST,
        },
      },
      GamesTable: {
        Type: AWS_DYMANODB_TABLE,
        Properties: {
          TableName: GAMES_TABLE,
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
          ],
          BillingMode: BillingMode.PAY_PER_REQUEST,
        },
      },
    },
  },
};

// serverless doesnt support 'export default' syntax;
module.exports = serverlessConfiguration;
