import type { APIGatewayProxyHandler } from 'aws-lambda';
import * as Responses from '../common/ApiResponses';

export const index: APIGatewayProxyHandler = async (event, context, callback) => {
  const { domainName, stage, identity } = event.requestContext;

  try {
    return Responses.ok({ message: 'got a message' });
  } catch (error) {
    callback(error);
    return Responses.badRequest({ message: 'message could not be received' });
  }
};

export default index;
