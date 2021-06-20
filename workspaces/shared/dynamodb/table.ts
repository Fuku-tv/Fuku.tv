import { v4 as uuidv4 } from 'uuid';
import dynamo from './dynamo';
import { Player, PointsLedger, Replay, defaults, BaseModel } from './models';
import { tableList } from './index';

export const genericTableMethods = <T extends BaseModel>(tableName: string) => ({
  async write(data: T): Promise<void> {
    return dynamo.write<T>(data, tableName);
  },
  async get(id: string): Promise<T> {
    return dynamo.get<T>(id, tableName);
  },
  async getList(attributes = ['']): Promise<T[]> {
    return dynamo.getList<T>(tableName, attributes);
  },
  async delete(id: string) {
    return dynamo.delete(id, tableName);
  },
});
// Create the DynamoDB service object

export const playersTableModel = {
  ...genericTableMethods<Player>(tableList.PLAYERS_TABLE),

  async removeCredits(id: string, creditsToRemove: number) {
    const player = await playersTableModel.get(id);
    if (player.credits < creditsToRemove) {
      throw new Error('Insufficent credits');
    }
    player.credits -= creditsToRemove;
    await playersTableModel.write(player);
  },

  async addCredits(id: string, creditsToAdd: number) {
    const player = await playersTableModel.get(id);
    if (player.credits === undefined) player.credits = creditsToAdd;
    else player.credits += creditsToAdd;
    await playersTableModel.write(player);
  },

  async addPoints(id: string, pointsToAdd: number) {
    const player = await playersTableModel.get(id);
    if (player.points === undefined) player.points = pointsToAdd;
    else player.points += pointsToAdd;
    await playersTableModel.write(player);
  },

  async removePoints(id: string, pointsToRemove: number) {
    const player = await playersTableModel.get(id);
    if (player.points === undefined) player.points = 0;
    if (player.points < pointsToRemove) {
      throw new Error('Insufficent points');
    }
    player.points -= pointsToRemove;
    await playersTableModel.write(player);

    // add transaction to ledger
    const data: PointsLedger = {
      id: uuidv4(),
      playerid: id,
      pointsRedeemed: pointsToRemove,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    pointsLedgerTableModel.write(data);
  },

  async removeFreeplay(id: string, freeplayToRemove: number) {
    const player = await playersTableModel.get(id);
    if (player.freeplay === undefined) player.freeplay = 0;
    if (player.freeplay < freeplayToRemove) {
      throw new Error('Insufficient freeplay');
    }
    player.freeplay -= freeplayToRemove;
    await playersTableModel.write(player);
  },

  async addFreeplay(id: string, freeplayToAdd: number) {
    const player = await playersTableModel.get(id);
    if (player.freeplay === undefined) player.freeplay = freeplayToAdd;
    else player.freeplay += freeplayToAdd;
    await playersTableModel.write(player);
  },
};

export const replayTableModel = {
  ...genericTableMethods<Replay>(tableList.REPLAY_TABLE),
};

const pointsLedgerTableModel = {
  ...genericTableMethods<PointsLedger>(tableList.POINTS_LEDGER_TABLE),
};
