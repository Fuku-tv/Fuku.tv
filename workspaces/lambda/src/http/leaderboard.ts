import type { APIGatewayProxyHandler } from 'aws-lambda';
import { playersTableModel } from 'fuku.tv-shared/dynamodb/table';

import * as Responses from '../common/ApiResponses';

export const index: APIGatewayProxyHandler = async (event, context, callback) => {
  const { domainName, stage, identity } = event.requestContext;
  const env = process.env.LAMBDA_ENV;
  try {
    const players = await playersTableModel.getList(['id', 'nickname', 'points']);
    const top20Players = players.sort((a, b) => b.points - a.points).slice(0, 20);
    const response = top20Players.map((player) => ({
      nickname: player.nickname || player.id.split('@')[0],
      points: player.points,
    }));

    return Responses.ok({ playerList: response });
  } catch (error) {
    callback(error);
    return Responses.badRequest({ message: 'message could not be received' });
  }
};

export default index;
