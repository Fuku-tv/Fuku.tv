import { v4 as uuidv4 } from 'uuid';
import dynamo from './dynamo';
import { Player, PointsLedger, Replay } from './models';
import { tableList } from './index';

// Create the DynamoDB service object

export const playersTableModel = {
  async write(data: Player): Promise<void> {
    return dynamo.write<Player>(data, tableList.PLAYERS_TABLE);
  },
  async get(id: string): Promise<Player> {
    return dynamo.get<Player>(id, tableList.PLAYERS_TABLE);
  },
  async delete(id: string) {
    return dynamo.delete(id, tableList.PLAYERS_TABLE);
  },

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
    if (player.credits === undefined)
      player.credits = creditsToAdd;
    else
      player.credits += creditsToAdd;
    await playersTableModel.write(player);
  },

  async addPoints(id: string, pointsToAdd: number) {
    const player = await playersTableModel.get(id);
    if (player.points === undefined)
      player.points = pointsToAdd;
    else
      player.points += pointsToAdd;
    await playersTableModel.write(player);
  },

  async removePoints(id: string, pointsToRemove: number) {
    const player = await playersTableModel.get(id);
    if (player.points === undefined)
      player.points = 0;
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
    if (player.freeplay === undefined)
      player.freeplay = 0;
    if (player.freeplay < freeplayToRemove) {
      throw new Error('Insufficient freeplay');
    }
    player.freeplay -= freeplayToRemove;
    await playersTableModel.write(player);
  },

  async addFreeplay(id: string, freeplayToAdd: number) {
    const player = await playersTableModel.get(id);
    if (player.freeplay === undefined)
      player.freeplay = freeplayToAdd;
    else
      player.freeplay += freeplayToAdd;
    await playersTableModel.write(player);
  },

  async updateLastFreeplayDate(id: string) {
    const player = await playersTableModel.get(id);
    player.lastfreeplaydate = Math.floor(new Date().getTime() / 1000);
    await playersTableModel.write(player);
  },
};

export const replayTableModel = {
  async write(data: Replay): Promise<void> {
    return dynamo.write<Replay>(data, tableList.REPLAY_TABLE);
  },
  async get(id: string): Promise<Replay> {
    return dynamo.get<Replay>(id, tableList.REPLAY_TABLE);
  },
  async delete(id: string) {
    return dynamo.delete(id, tableList.REPLAY_TABLE);
  },
};

const pointsLedgerTableModel = {
  async write(data: PointsLedger): Promise<void> {
    return dynamo.write<PointsLedger>(data, tableList.POINTS_LEDGER_TABLE);
  },
  async get(id: string): Promise<PointsLedger> {
    return dynamo.get<PointsLedger>(id, tableList.POINTS_LEDGER_TABLE);
  },
  async delete(id: string) {
    return dynamo.delete(id, tableList.POINTS_LEDGER_TABLE);
  },
};

export const createTable = () => {};
