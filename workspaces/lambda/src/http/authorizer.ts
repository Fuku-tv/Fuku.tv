import type { APIGatewayAuthorizerResult, APIGatewayProxyHandler, APIGatewayTokenAuthorizerHandler } from 'aws-lambda';
import auth0, { UserData } from 'auth0';
import jwt from 'jsonwebtoken';
import validateUser from 'src/common/authorizer';
import * as Responses from '../common/ApiResponses';

// Policy helper function
const generatePolicy = (principalId, effect, resource) => {
  const authResponse: APIGatewayAuthorizerResult = {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };

  return authResponse;
};

// eslint-disable-next-line consistent-return
export const index: APIGatewayTokenAuthorizerHandler = (event, context, callback) => {
  if (!event.authorizationToken) {
    return callback('Token not found');
  }

  const tokenParts = event.authorizationToken.split(' ');
  const tokenValue = tokenParts[1];

  if (!(tokenParts[0].toLowerCase() === 'bearer' && tokenValue)) {
    // no auth token!
    return callback('Token is malformed');
  }

  validateUser(tokenValue)
    .then((user) => callback(null, generatePolicy(user, 'Allow', event.methodArn)))
    .catch((err) => callback(`catch error. Invalid token : ${err}`));

  // try {
  //   jwt.verify(tokenValue, AUTH0_CLIENT_PUBLIC_KEY, options, (verifyError, decoded) => {
  //     if (verifyError) {
  //       console.log('verifyError', verifyError);
  //       // 401 Unauthorized
  //       console.log(`Token invalid. ${verifyError}`);
  //       return callback(`Token invalid. ${verifyError}`);
  //     }
  //     // is custom authorizer function
  //     console.log('valid from customAuthorizer', decoded);
  //     return callback(null, generatePolicy(decoded.sub, 'Allow', event.methodArn));
  //   });
  // } catch (err) {
  //   console.log('catch error. Invalid token', err);
  //   return callback(`catch error. Invalid token : ${err}`);
  // }
};

export default {};
