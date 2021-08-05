import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, PutCommandInput, DeleteCommandInput, ScanCommandInput, GetCommandInput } from '@aws-sdk/lib-dynamodb';
import { BaseModel } from './models';

const documentClient = DynamoDBDocument.from(new DynamoDBClient({ apiVersion: 'latest', region: 'us-east-1' }));

const Dynamo = {
  /**
   * Gets list of table item ids
   * @param tableName
   * @returns
   */
  async getList<T>(tableName: string, attributes: string[]): Promise<T[]> {
    const params: ScanCommandInput = {
      TableName: tableName,
      ProjectionExpression: attributes.join(),
    };

    const data = await documentClient.scan(params);

    if (!data || data.Count <= 0) {
      throw Error(`There was an error fetching the data list for ${tableName}`);
    }

    return data.Items as T[];
  },
  async get<T>(id: string, tableName: string): Promise<T> {
    const params: GetCommandInput = {
      TableName: tableName,
      Key: {
        id,
      },
    };

    const data = await documentClient.get(params);

    if (!data || !data.Item) {
      throw Error(`There was an error fetching the data for id of ${id} from ${tableName}`);
    }

    return data.Item as T;
  },

  async write<T extends BaseModel>(data: T, tableName: string): Promise<void> {
    if (!data.id) {
      throw Error('no id on the data');
    }

    const params: PutCommandInput = {
      TableName: tableName,
      Item: data,
    };
    const res = await documentClient.put(params);

    if (!res) {
      throw Error(`There was an error inserting id of ${data.id} in table ${tableName}`);
    }
  },

  async delete(id: string, tableName: string): Promise<void> {
    const params: DeleteCommandInput = {
      TableName: tableName,
      Key: {
        id,
      },
    };
    const res = await documentClient.delete(params);
    if (!res) {
      throw Error(`There was an error deleting id of ${id} in table ${tableName}`);
    }
  },
};
export default Dynamo;
