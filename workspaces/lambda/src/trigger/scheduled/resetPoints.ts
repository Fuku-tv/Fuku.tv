import type { ScheduledHandler } from 'aws-lambda';
import { playersTableModel } from 'fuku.tv-shared/dynamodb/table';
import { getWebhookClient } from 'fuku.tv-shared/discord';
import type { Player } from 'fuku.tv-shared/dynamodb/models';

export const index: ScheduledHandler = async () => {
  let winningPlayer: Player = null;
  try {
    // get list of players, sort by most points ascending
    const playerIdList = (await playersTableModel.getList(['id', 'points', 'nickname'])).sort((a, b) => b.points - a.points);

    // get player with most points
    [winningPlayer] = playerIdList;

    console.log(`Found Winner ${JSON.stringify(winningPlayer)}`);
    console.log(`Found ${playerIdList.length} players to update`);
    playerIdList.forEach(async (player) => {
      // reset point count to 0
      console.log(`reset points for player ${player.id} to 0`);
      playersTableModel.resetPoints(player.id);
    });
  } catch (error) {
    console.log('Update Freeplay error: ', error);
  }

  try {
    const discordWebhook = await getWebhookClient();
    await discordWebhook.send(
      `The leaderboards have been reset, This weeks Leaderboard champion is 🎉**__${winningPlayer.nickname}__**.🎉 Come try your chances at [Fuku.tv](https://fuku.tv)! Have fun`,
      {
        username: 'Fuku Bot',
      }
    );
    console.log(`Sent notification to discord server`);
  } catch (error) {
    console.log('Unable to send discord notification: ', error);
  }
};

export default index;
