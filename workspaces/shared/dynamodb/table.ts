import dynamo from './dynamo';
import { BaseModel } from './models';

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
export default table;
