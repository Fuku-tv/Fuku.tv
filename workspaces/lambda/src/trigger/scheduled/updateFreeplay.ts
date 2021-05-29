import type { ScheduledHandler } from 'aws-lambda';
import { playersTableModel } from 'fuku.tv-shared/dynamodb/table';

const FREEPLAY_COUNT = 2;

export const index: ScheduledHandler = async () => {
  const playerIdList = await playersTableModel.getList();
  playerIdList.forEach(async (id) => {
    await playersTableModel.addFreeplay(id, FREEPLAY_COUNT);
  });
};

export default index;
