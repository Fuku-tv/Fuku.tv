import type { ScheduledHandler } from 'aws-lambda';
import { playersTableModel } from 'fuku.tv-shared/dynamodb/table';
import { getWebhookClient } from 'fuku.tv-shared/discord';

const FREEPLAY_COUNT = 2;

const FREEPLAY_LIMIT = 10;

export const index: ScheduledHandler = async () => {
  try {
    const playerIdList = await playersTableModel.getList(['id', 'freeplay']);
    console.log(`Found ${playerIdList.length} players to update`);
    playerIdList.forEach(async (player) => {
      if (player?.freeplay < FREEPLAY_LIMIT) {
        console.log(`added ${FREEPLAY_COUNT} freeplay points to user ${player.id}`);
        playersTableModel.addFreeplay(player.id, FREEPLAY_COUNT);
      } else {
        console.log(`Player ${player.id} already has ${player.freeplay} points in their account, skipping`);
      }
    });
  } catch (error) {
    console.log('Update Freeplay error: ', error);
  }

  try {
    const discordWebhook = await getWebhookClient();
    await discordWebhook.send(`The fuku bot has granted everyone ${FREEPLAY_COUNT} freeplay tickets to play [Fuku.tv](https://fuku.tv)! Have fun`, {
      username: 'Fuku Bot',
    });
    console.log(`Sent notification to discord server`);
  } catch (error) {
    console.log('Unable to send discord notification: ', error);
  }
};

export default index;
