import { dynamo } from 'fuku.tv-shared/dynamodb';
import { BaseModel, Game, Player } from 'fuku.tv-shared/dynamodb/models';

const { gamesTable, playersTable } = process.env;

export const gamesTableModel = {
  async write(data: Game): Promise<void> {
    return dynamo.write<Game>(data, gamesTable);
  },
  async get(id: string): Promise<Game> {
    return dynamo.get<Game>(id, gamesTable);
  },
  async delete(id: string) {
    return dynamo.delete(id, gamesTable);
  },
};

export const playersTableModel = {
  async write(data: Player): Promise<void> {
    return dynamo.write<Player>(data, playersTable);
  },
  async get(id: string): Promise<Player> {
    return dynamo.get<Player>(id, playersTable);
  },
  async delete(id: string) {
    return dynamo.delete(id, playersTable);
  },
};

export const table = <T extends BaseModel>(tableName: string) => ({
  async write(data: T): Promise<void> {
    return dynamo.write<T>(data, tableName);
  },
  async get(id: string): Promise<T> {
    return dynamo.get<T>(id, tableName);
  },
  async delete(id: string) {
    return dynamo.delete(id, tableName);
  },
});
