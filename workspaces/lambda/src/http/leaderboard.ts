import type { APIGatewayProxyHandler } from 'aws-lambda';
import { playersTableModel } from 'fuku.tv-shared/dynamodb/table';

import * as Responses from '../common/ApiResponses';

export const index: APIGatewayProxyHandler = async (event, context, callback) => {
  const { domainName, stage, identity } = event.requestContext;
  const env = process.env.LAMBDA_ENV;
  try {
    const players = await playersTableModel.getList(['nickname', 'points']);
    const top20Players = players.slice(0, 20).sort((a, b) => b.points - a.points);
    return Responses.ok({ playerList: top20Players });
  } catch (error) {
    callback(error);
    return Responses.badRequest({ message: 'message could not be received' });
  }
};

export default index;
