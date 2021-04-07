import type { APIGatewayProxyHandler } from 'aws-lambda';

import * as Responses from '../common/ApiResponses';

export const index: APIGatewayProxyHandler = async (event, context, callback) => {
  const { domainName, stage, identity } = event.requestContext;
  const env = process.env.LAMBDA_ENV;
  try {
    return Responses.ok({ message: `got a message from stage : ${env}` });
  } catch (error) {
    callback(error);
    return Responses.badRequest({ message: 'message could not be received' });
  }
};

export default index;
