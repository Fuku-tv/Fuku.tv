import type { APIGatewayProxyHandler } from 'aws-lambda';
import Client from 'agcod';
import { env } from 'fuku.tv-shared';
import validateUser from 'src/common/authorizer';
import { sendEmail } from '../common/emailService';
import * as Responses from '../common/ApiResponses';

const REGION = 'NA';

const CURRENCY = 'USD';

const config = {
  endpoint: {
    NA: {
      host: env.amazonGiftCardURL(),
      region: 'us-east-1',
      countries: ['US', 'CA'],
    },
  },
  partnerId: 'Fu863',
  credentials: {
    accessKeyId: env.amazonGiftCardKey(),
    secretAccessKey: env.amazonGiftCardSecret(),
  },
};

const client = new Client(config);

const createGiftCard = async (amount: number): Promise<any> => {
  const data = await client.createGiftCardAsync(REGION, amount, CURRENCY);

  return data.gcClaimCode;
};

export const index: APIGatewayProxyHandler = async (event, context, callback) => {
  const { domainName, stage, identity } = event.requestContext;
  const res = JSON.parse(event.body);

  let email: string;
  try {
    const user = await validateUser(event.headers.Authorization);
    email = user.email;
  } catch (error) {
    return Responses.badRequest({ message: 'User could not be validated' });
  }

  try {
    // TODO get gift card amount from request body
    const claimCode = await createGiftCard(res.amount);
    await sendEmail('support@fuku.tv', email, 'Fuku Redemption', claimCode);
    return Responses.ok({ message: JSON.stringify(claimCode) });
  } catch (error) {
    console.log('error found');
    return Responses.badRequest({ message: JSON.stringify(error) });
  }
};

export default index;
