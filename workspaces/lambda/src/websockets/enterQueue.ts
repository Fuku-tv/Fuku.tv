import { APIGatewayProxyHandler } from 'aws-lambda';
import * as Responses from '../common/ApiResponses';
import { gamesTableModel } from '../common/tables';
import { sendMessage } from '../common/websocketMessage';

const handler: APIGatewayProxyHandler = async (event, context, callback) => {
  const { connectionId, domainName, stage } = event.requestContext;

  try {
    // todo add game from here untill PI's will invoke this gateway
    const game = await gamesTableModel.get('1234');

    if (game.queue.find((x) => x === connectionId)) {
      sendMessage(domainName, stage, connectionId, 'you are already in the queue');
      return Responses.badRequest({ message: 'you are already in the queue' });
    }
    game.queue.push(connectionId);

    gamesTableModel.write(game);

    return Responses.ok({ message: 'got a message' });
  } catch (error) {
    callback(error);
    return Responses.badRequest({ message: 'message could not be received' });
  }
};

export default handler;
