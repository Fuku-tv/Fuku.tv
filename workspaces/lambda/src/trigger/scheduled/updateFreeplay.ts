import type { ScheduledHandler } from 'aws-lambda';
import { playersTableModel } from 'fuku.tv-shared/dynamodb/table';

const FREEPLAY_COUNT = 2;

export const index: ScheduledHandler = async () => {
  try {
    const playerIdList = await playersTableModel.getList(['id', 'freeplay']);
    console.log(`Found ${playerIdList.length} players to update`);
    playerIdList.forEach(async (player) => {
      if (player?.freeplay > 20) {
        console.log(`Player ${player.id} already has ${player.freeplay} points in their account, skipping`);
      } else {
        await playersTableModel.addFreeplay(player.id, FREEPLAY_COUNT);
        console.log(`added ${FREEPLAY_COUNT} freeplay points to user ${player.id}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export default index;
