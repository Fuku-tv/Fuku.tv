import dynamo from './dynamo';
import { Player } from './models';
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
};

export const createTable = () => {};
