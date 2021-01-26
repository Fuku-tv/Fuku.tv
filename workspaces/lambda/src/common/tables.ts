import Dynamo from './dynamo';
import { Game, Player } from './models';

const { gamesTable, playersTable } = process.env;

export const gamesTableModel = {
  async write(data: Game): Promise<void> {
    return Dynamo.write<Game>(data, gamesTable);
  },
  async get(id: string): Promise<Game> {
    return Dynamo.get<Game>(id, gamesTable);
  },
  async delete(id: string) {
    return Dynamo.delete(id, gamesTable);
  },
};

export const playersTableModel = {
  async write(data: Player): Promise<void> {
    return Dynamo.write<Player>(data, playersTable);
  },
  async get(id: string): Promise<Player> {
    return Dynamo.get<Player>(id, playersTable);
  },
  async delete(id: string) {
    return Dynamo.delete(id, playersTable);
  },
};
