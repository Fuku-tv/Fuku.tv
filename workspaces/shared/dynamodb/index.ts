import { DynamoDB } from 'aws-sdk';

import { getStage } from '../env';

const ddb = new DynamoDB({ apiVersion: 'latest', region: 'us-east-1' });
// get the stage option from arguments
// eslint-disable-next-line no-template-curly-in-string
const STAGE = getStage();

export const tableList = { PLAYERS_TABLE: `Players-${STAGE}`, GAMES_TABLE: `Games-${STAGE}` };
/**
 * Initialize DynamoDB tables
 */
export const initializeDatabase = async (): Promise<void> => {
  const result = await ddb.listTables().promise();

  const list = Object.values(tableList).map((table) => {
    if (result.TableNames.includes(table)) {
      return null;
    }
    return table;
  });

  list.forEach((table) => {
    if (table === null) {
      return;
    }

    ddb
      .createTable(setTableParams(table))
      .promise()
      .then(() => {})
      .catch((err) => {});
  });
};

const setTableParams = (tableName: string): DynamoDB.CreateTableInput => ({
  AttributeDefinitions: [
    {
      AttributeName: 'id',
      AttributeType: 'S',
    },
  ],
  KeySchema: [
    {
      AttributeName: 'id',
      KeyType: 'HASH',
    },
  ],
  BillingMode: 'PAY_PER_REQUEST',

  TableName: tableName,
});
