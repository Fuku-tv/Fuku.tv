import dynamo from './dynamo';
import { Player, Replay } from './models';
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
    player.credits -= creditsToRemove;
    await playersTableModel.write(player);
  },

  async addCredits(id: string, creditsToAdd: number) {
    const player = await playersTableModel.get(id);
    player.credits += creditsToAdd;
    await playersTableModel.write(player);
  },

  async addPoints(id: string, pointsToAdd: number) {
    const player = await playersTableModel.get(id);
    player.points += pointsToAdd;
    await playersTableModel.write(player);
  },

  async removeFreeplay(id: string, freeplayToRemove: number) {
    const player = await playersTableModel.get(id);
    player.freeplay -= freeplayToRemove;
    await playersTableModel.write(player);
  },

  async addFreeplay(id: string, freeplayToAdd: number) {
    const player = await playersTableModel.get(id);
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
  }
};

export const createTable = () => {};
