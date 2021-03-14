import { DynamoDB, config } from 'aws-sdk';
import * as path from 'path';
import { getStage } from '../env';
import { LoggerClass, LogLevel } from '../logger';

const ddb = new DynamoDB({ apiVersion: 'latest', region: 'us-east-1' });
// get the stage option from arguments
const STAGE = getStage();

export const tableList = { PLAYERS_TABLE: `Players-${STAGE}`, GAMES_TABLE: `Games-${STAGE}` };
/**
 * Initialize DynamoDB tables
 */
export const initializeDatabase = async (): Promise<void> => {
  // get list of all tables in DynamoDB
  const result = await ddb.listTables().promise();

  // check results for existing tables to prevent overwriting
  const list = Object.values(tableList).map((table) => {
    if (result.TableNames.includes(table)) {
      return null;
    }
    return table;
  });

  // create table if not listed in results
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
