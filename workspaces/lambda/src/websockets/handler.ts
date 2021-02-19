import type { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import fetch from 'node-fetch';
import { Player } from 'fuku.tv-shared/dynamodb/models';
import * as Responses from '../common/ApiResponses';
import { gamesTableModel, playersTableModel } from '../common/tables';
import { sendMessage } from '../common/websocketMessage';

export const connect: APIGatewayProxyHandler = async (event, context, callback) => {
  try {
    // const { token } = event.queryStringParameters;
    const { connectionId, identity, stage, domainName } = event.requestContext;

    const data: Player = {
      id: connectionId,
      connectionDate: Date.now(),
      credits: 10,
      ipAddress: identity.sourceIp,
      domainName,
      stage,
    };
    // const response = await fetch('https://fukutv-alpha.us.auth0.com/userinfo', {
    //   method: 'get',
    //   headers: {
    //     Authorization: `bearer ${token}`,
    //   },
    // });
    // switch (response.status) {
    //   case 401:
    //     callback('unauthorized');
    //     return Responses.unauthorized();

    //   default:
    //     break;
    // }
    await playersTableModel.write(data);
  } catch (err) {
    callback(err);
    return Responses.serverError(`Failed to connect: ${JSON.stringify(err)}`);
  }

  return Responses.ok('Connected to Fuku.TV');
};

export const disconnect = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { connectionId } = event.requestContext;
  try {
    // todo find better way to target game
    const game = await gamesTableModel.get('1234');

    // remove player from current game if playing
    if (game.currentPlayer === connectionId) {
      game.currentPlayer = null;
    }

    // remove user from queue
    const index = game.queue.indexOf(connectionId);
    if (index > -1) {
      game.queue.splice(index, 1);
    }

    gamesTableModel.write(game);

    await playersTableModel.delete(connectionId);
  } catch (err) {
    return Responses.serverError(err);
  }

  return Responses.ok('Disconnected.');
};

/**
 * needed because default is a js reserved word
 * @param event
 */
export const wsDefault: APIGatewayProxyHandler = async (event) => {
  const { domainName, stage, connectionId } = event.requestContext;
  await sendMessage(domainName, stage, connectionId, 'Invalid action');
  return { statusCode: 400, body: 'Default Route Hit' };
};

export default wsDefault;
