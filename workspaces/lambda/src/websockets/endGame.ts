import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as Responses from '../common/ApiResponses';
import { gamesTableModel, playersTableModel } from '../common/tables';

const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { connectionId } = event.requestContext;
  try {
    // todo find better way to target game
    const game = await gamesTableModel.get('1234');

    // remove user from queue
    const index = game.queue.indexOf(connectionId);
    if (index > -1) {
      game.queue.splice(index, 1);
    }

    // remove player from current game if playing
    if (game.currentPlayer === connectionId) {
      game.currentPlayer = null;
    }

    await gamesTableModel.write(game);
  } catch (err) {
    return Responses.serverError(err);
  }

  return Responses.ok('Game Ended');
};

export default handler;
