import * as AWS from 'aws-sdk';
import type { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { BaseModel } from './models';

const documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: 'latest', region: 'us-east-1' });

const Dynamo = {
  /**
   * Gets list of table item ids
   * @param tableName
   * @returns
   */
  async getList(tableName: string): Promise<string[]> {
    const params: DocumentClient.ScanInput = {
      TableName: tableName,
      ProjectionExpression: 'id',
    };

    const data = await documentClient.scan(params).promise();

    if (!data || data.Count <= 0) {
      throw Error(`There was an error fetching the data list for ${tableName}`);
    }

    return data.Items.map((x) => x.id);
  },
  async get<T>(id: string, tableName: string): Promise<T> {
    const params = {
      TableName: tableName,
      Key: {
        id,
      },
    };

    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      throw Error(`There was an error fetching the data for id of ${id} from ${tableName}`);
    }

    return data.Item as T;
  },

  async write<T extends BaseModel>(data: T, tableName: string): Promise<void> {
    if (!data.id) {
      throw Error('no id on the data');
    }

    const params = {
      TableName: tableName,
      Item: data,
    };
    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(`There was an error inserting id of ${data.id} in table ${tableName}`);
    }
  },

  async delete(id: string, tableName: string): Promise<void> {
    const params = {
      TableName: tableName,
      Key: {
        id,
      },
    };
    const res = await documentClient.delete(params).promise();
    if (!res) {
      throw Error(`There was an error deleting id of ${id} in table ${tableName}`);
    }
  },
};
export default Dynamo;
