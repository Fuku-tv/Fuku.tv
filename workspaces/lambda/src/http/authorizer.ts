import type { APIGatewayAuthorizerResult, APIGatewayProxyHandler, APIGatewayTokenAuthorizerHandler } from 'aws-lambda';
import auth0, { UserData } from 'auth0';
import * as Responses from '../common/ApiResponses';

const auth0Client = new auth0.AuthenticationClient({
  domain: 'fukutv-alpha.us.auth0.com',
});
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

export const authorizer: APIGatewayTokenAuthorizerHandler = (event, context, callback) =>
  // console.log(event.authorizationToken);
  // try {
  //   console.log(event.authorizationToken);
  //   const user: UserData = await auth0Client.getProfile(event.authorizationToken);
  //   callback('Allow', generatePolicy(user.email, 'Allow', event.methodArn));
  //   return user;
  // } catch (error) {
  //   console.log(event.authorizationToken);
  //   callback('Unauthorized');
  //   return error;
  // }

  callback(null, generatePolicy('user', 'Allow', event.methodArn));

export default {};
