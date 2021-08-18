import type { UserData } from 'auth0';
import auth0 from 'auth0';
import type { APIGatewayEventRequestContextWithAuthorizer, APIGatewayProxyResult, Handler } from 'aws-lambda';

interface Authorizer {
  principalId: PrincipalId;
}

interface PrincipalId {
  email: string;
  sub: string;
}

const auth0Client = new auth0.AuthenticationClient({
  domain: 'fukutv-alpha.us.auth0.com',
});

/**
 * @param {string} token
 * @returns {Promise<UserData>}
 * @memberof module:auth
 *
 * Validates user token with authorization server
 * */
export const validateUser = async (token: string): Promise<UserData> => {
  // clean Bearer label if it exists
  const parsedToken = token.replace('Bearer ', '');
  const user = await auth0Client.getProfile(parsedToken);
  return user;
};

export const readPrincipalId = (auth: { [name: string]: any }): PrincipalId => auth.principalId as PrincipalId;

export default validateUser;
