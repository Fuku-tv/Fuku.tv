import type { APIGatewayProxyHandler } from 'aws-lambda';
import validateUser, { readPrincipalId } from 'src/common/authorizer';

import * as Responses from '../../common/ApiResponses';

export const index: APIGatewayProxyHandler = async (event, context, callback) => {
  const { authorizer } = event.requestContext;
  const { email } = readPrincipalId(authorizer);

  try {
    // fetch user profile info
    const user = await validateUser(event.headers.Authorization);

    return Responses.ok({ userProfile: user });
  } catch (error) {
    return Responses.badRequest({ message: 'message could not be received' });
  }
};

export default index;
