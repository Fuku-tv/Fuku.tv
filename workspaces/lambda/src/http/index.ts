import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import * as Responses from '../common/ApiResponses';

const handler: APIGatewayProxyHandlerV2 = async (event, context, callback) => {
  const { domainName, stage } = event.requestContext;

  try {
    return Responses.ok({ message: 'got a message' });
  } catch (error) {
    callback(error);
    return Responses.badRequest({ message: 'message could not be received' });
  }
};

export default handler;
