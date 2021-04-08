import type { APIGatewayProxyHandler } from 'aws-lambda';
import Client from 'agcod';
import { env } from 'fuku.tv-shared';
import validateUser from 'src/common/authorizer';
import { playersTableModel } from 'fuku.tv-shared/dynamodb/table';
import { sendEmail } from '../common/emailService';
import * as Responses from '../common/ApiResponses';

interface Body {
  amount: number;
  pointsToSpend: number;
}

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
  const res: Body = JSON.parse(event.body);

  // validate user
  let email: string;
  try {
    const user = await validateUser(event.headers.Authorization);
    email = user.email;
  } catch (error) {
    return Responses.badRequest({ message: 'User could not be validated' });
  }

  // deduct points and send customer redemption code
  try {
    playersTableModel.removePoints(email, res.pointsToSpend);
    // TODO get gift card amount from request body
    const claimCode = await createGiftCard(res.amount);
    await sendEmail('support@fuku.tv', email, 'Fuku Redemption', claimCode);
    return Responses.ok({ message: JSON.stringify(claimCode) });
  } catch (error) {
    // add points back in case of an gift card error
    playersTableModel.addPoints(email, res.pointsToSpend);
    return Responses.badRequest({ message: JSON.stringify(error) });
  }
};

export default index;
