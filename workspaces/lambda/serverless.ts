import type { Serverless } from 'serverless/aws';

import * as aws from 'aws-sdk';
import { devDependencies } from './package.json';

const PLAYERS_TABLE = 'Players';
const GAMES_TABLE = 'Games';

const AWS_DYMANODB_TABLE = 'AWS::DynamoDB::Table';

const frameworkVersion = devDependencies.serverless;

enum BillingMode {
  PAY_PER_REQUEST = 'PAY_PER_REQUEST',
}

const serverlessConfiguration: Serverless = {
  frameworkVersion,
  service: 'Fuku-Serverless',
  configValidationMode: 'error',
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: 'local',
    region: 'us-east-1',
    environment: {
      playersTable: PLAYERS_TABLE,
      gamesTable: GAMES_TABLE,
    },
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
    'websocket-connect': {
      handler: 'src/websockets/handler.connect',
      events: [{ websocket: { route: '$connect' } }],
    },
    'websocket-disconnect': {
      handler: 'src/websockets/handler.connect',
      events: [{ websocket: { route: '$disconnect' } }],
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
          BillingMode: 'PAY_PER_REQUEST',
        },
      },
    },
  },
};

// serverless doesnt support 'export default' syntax;
module.exports = serverlessConfiguration;
