import { APIGatewayProxyHandler } from 'aws-lambda';
import * as Responses from '../common/ApiResponses';
import { gamesTableModel, playersTableModel } from '../common/tables';
import { sendMessage } from '../common/websocketMessage';

const handler: APIGatewayProxyHandler = async (event, context, callback) => {
  const { connectionId, domainName, stage } = event.requestContext;

  try {
    // todo add game from here untill PI's will invoke this gateway
    const game = await gamesTableModel.get('1234');
    const player = await playersTableModel.get(connectionId);

    // remove player from current game if playing
    if (game.currentPlayer === connectionId) {
      sendMessage(domainName, stage, connectionId, 'Already Playing');
      return Responses.badRequest({ message: 'Already Playing' });
    }

    // check if client is next in line to play
    if (game.queue[0] === connectionId || game.currentPlayer === connectionId) {
      // check for available credits
      if (player.credits < 1) {
        sendMessage(domainName, stage, connectionId, 'out of credits');
        return Responses.badRequest({ message: 'out of credits' });
      }
      // minus 1 credit for game
      player.credits -= 1;
      game.currentPlayer = connectionId;

      await playersTableModel.write(player);
      await gamesTableModel.write(game);

      sendMessage(domainName, stage, connectionId, JSON.stringify(player));

      // TODO put game logic/timer here
      await runGame(connectionId, domainName, stage);

      // game is ended
      game.currentPlayer = null;
      await gamesTableModel.write(game);

      sendMessage(domainName, stage, connectionId, 'round over, play again?');
    } else {
      sendMessage(domainName, stage, connectionId, 'It is not yet your turn to play');
      return Responses.badRequest({ message: 'It is not yet your turn to play' });
    }

    // game ended
    return Responses.ok({ message: 'got a message' });
  } catch (error) {
    callback(error);
    return Responses.badRequest({ message: 'message could not be received' });
  }
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const runGame = async (connectionId, domainName, stage) => {
  let seconds = 30;

  await new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      seconds -= 1;
      sendMessage(domainName, stage, connectionId, `${seconds} seconds remaining`);
      if (seconds <= 0) {
        clearInterval(timer);
        resolve(null);
      }
    }, 1000);
  });
};

export default handler;
