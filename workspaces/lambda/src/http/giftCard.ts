import type { APIGatewayProxyHandler } from 'aws-lambda';
import Client from 'agcod';
import { env } from 'fuku.tv-shared';
import validateUser from 'src/common/authorizer';
import * as Responses from '../common/ApiResponses';

const REGION = 'NA';

const CURRENCY = 'USD';

const config = {
  endpoint: {
    NA: {
      host: 'agcod-v2-gamma.amazon.com',
      region: 'us-east-1',
      countries: ['US', 'CA'],
    },
  },
  partnerId: 'Fu863',
  credentials: {
    accessKeyId: 'AKIAWWFS6UKLOKZ7UTLW',
    secretAccessKey: '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',
  },
};

const client = new Client(config);

const createGiftCard = (amount: number): any => {
  let response;
  client.createGiftCard(REGION, amount, CURRENCY, (error, result) => {
    console.log('client.createGiftCard response', error, result);
    response = result;
  });

  return response;
};

export const index: APIGatewayProxyHandler = async (event, context, callback) => {
  const { domainName, stage, identity } = event.requestContext;
  console.log('test');
  // validate connection

  try {
    const user = await validateUser(event.headers.Authorization);
  } catch (error) {
    return Responses.badRequest({ message: 'User could not be validated' });
  }

  try {
    // TODO get gift card amount from request body
    const claimCode = createGiftCard(10);
    return Responses.ok({ message: JSON.stringify(claimCode) });
  } catch (error) {
    return Responses.badRequest({ message: 'message could not be received' });
  }
};

export default index;
