import * as AWS from 'aws-sdk';
import { BaseModel } from './models';

const documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: 'us-east-1' });

const Dynamo = {
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
