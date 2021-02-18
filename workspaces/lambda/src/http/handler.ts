import type { APIGatewayProxyHandler } from 'aws-lambda';
import { Player } from 'fuku.tv-shared/dynamodb/models';
import * as Responses from '../common/ApiResponses';

import { table } from '../common/tables';

export const index: APIGatewayProxyHandler = async (event, context, callback) => {
  const { domainName, stage, identity } = event.requestContext;
  const playersTableModel = table<Player>(process.env.playersTable);
  try {
    const data: Player = {
      id: identity.sourceIp,
      connectionDate: Date.now(),
      credits: 10,
      ipAddress: identity.sourceIp,
    };
    await playersTableModel.write(data);
    return Responses.ok({ message: 'got a message' });
  } catch (error) {
    callback(error);
    return Responses.badRequest({ message: 'message could not be received' });
  }
};

export const test: APIGatewayProxyHandler = async (event, context, callback) => {
  const { domainName, stage } = event.requestContext;

  try {
    return Responses.ok({ message: 'got a message' });
  } catch (error) {
    callback(error);
    return Responses.badRequest({ message: 'message could not be received' });
  }
};
