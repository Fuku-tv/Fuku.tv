import type { Serverless } from 'serverless/aws';

import type {} from 'serverless-bundle';

import { devDependencies } from './package.json';

/**
 *  Certificate for auth0 token signing
 * */
const certificate = `-----BEGIN CERTIFICATE-----
MIIDDTCCAfWgAwIBAgIJcJJhZp3ETUMeMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV
BAMTGWZ1a3V0di1hbHBoYS51cy5hdXRoMC5jb20wHhcNMjAxMjA1MjIwNjAwWhcN
MzQwODE0MjIwNjAwWjAkMSIwIAYDVQQDExlmdWt1dHYtYWxwaGEudXMuYXV0aDAu
Y29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnd+0JeqneEkCM8bt
Zy7HBEq8TmnPyHwFg53OzXASRe9A3rXSNzurvjEJydl9HbTRqWxPR8GurQ8nKsz9
/5PGpb3w+mzYTUx7S8jhRGGxV5LaDjEZgbUIub6/cdYHakZ+87JmSHe1hckfmBu5
RYThr/fD/S9lJrK5LFLZXisH/O/QApnZomaC9PZDrBZtZ7fIf/uC6OqBsLgmEwxt
tdUWgDzIOdzfxEhqFHIHbxwXgrhQMbUL9yaqw2rZ9pprOmlBT08A0AC80KsyjAuI
2dffcFoQitvXII1Wl/c9eor4Ha3AKjLI/AcfJMQmUPvFRH/P/CQL/rfwUZYGwbP4
MgWOQwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBRHY1q1h3Q3
CuH6BDQqd4oYVlx9TDAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEB
AGaIuv104LbXEMoirO/AKzKOTGHDrbuJvDtFVzD7BdOjMZLGITPze/vwdmsxNC65
8j++eDaH7Rm2WBdKDN9in6t9qdtGBDuh9xu3QmHNcjHzR7re2ggL+pEoX7exYoB1
zsUNhCdOeeoFNhOI10CZ7AAZg8G7dilVuESxWnBjd6cdaSmbMyL85nb8Ud20yOn3
eNs4wWXRBm+0cQL8rhQr2y5UF+0krmd5A0bD0yzee+5II3siQ0EdRm+VqHg3tHYy
pdWOpK9R+zqytQoudxAH4G4Z6eYdxoZlF1MDeiVpRx69D6h2iKRvKpq2BdyTHWRI
ldkobnDMS9x4aNYATk0Pbhg=
-----END CERTIFICATE-----`;

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
      AUTH0_CLIENT_ID: '6N4jkRkDRisBK9GjkCsMjLmESvOpAZN1',
      AUTH0_CLIENT_PUBLIC_KEY: certificate,
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
      handler: 'src/http/checkout.index',
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
