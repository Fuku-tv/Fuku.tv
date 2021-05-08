import type { APIGatewayProxyHandler } from 'aws-lambda';
import type { GiftCardCatalogue } from 'fuku.tv-shared/giftCard';
import Client from 'agcod';
import { env } from 'fuku.tv-shared';
import { amazonGiftCardSecret, amazonGiftCardKey } from 'fuku.tv-shared/secrets/getSecret';
import validateUser from 'src/common/authorizer';
import { playersTableModel } from 'fuku.tv-shared/dynamodb/table';
import { sendEmail } from '../common/emailService';
import * as Responses from '../common/ApiResponses';

interface Body {
  amount: number;
}

const emailBody = (amount, code) =>
  `Congratulations! You've redeemed points at Fuku.Tv <br/>
  <br/>
You chose an Amazon Gift Card worth $${amount}! Here is the code to redeem at Amazon.com: <br/>
<br/>
${code} <br/>
<br/>
You can Redeem your code here: https://www.amazon.com/gc/redeem`;

// hard-coded list of giftcards
const giftCardList: GiftCardCatalogue[] = [
  {
    amount: 10,
    pointCost: 1000,
  },
  {
    amount: 25,
    pointCost: 2500,
  },
  {
    amount: 50,
    pointCost: 5000,
  },
  {
    amount: 100,
    pointCost: 10000,
  },
];
const REGION = 'NA';

const CURRENCY = 'USD';

const createGiftCard = async (amount: number, URL: string): Promise<string> => {
  const client = new Client({
    endpoint: {
      NA: {
        host: URL,
        region: 'us-east-1',
        countries: ['US', 'CA'],
      },
    },
    partnerId: 'Fu863',
    credentials: {
      accessKeyId: await amazonGiftCardKey(),
      secretAccessKey: await amazonGiftCardSecret(),
    },
  });
  const data = await client.createGiftCardAsync(REGION, amount, CURRENCY);
  console.log(data);
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

  // validate request body to prevent gift card redemption at insufficient points

  const giftCard = giftCardList.find((x) => x.amount === res.amount);
  if (giftCard === undefined) {
    return Responses.badRequest({ message: 'prize not found in database' });
  }

  // get dev or prod host endpoint depending on lambda stage
  const URL =
    stage === 'prod'
      ? // production endpoint
        'agcod-v2.amazon.com'
      : // development endpoint
        'agcod-v2-gamma.amazon.com';

  // deduct points and send customer redemption code
  try {
    await playersTableModel.removePoints(email, giftCard.pointCost);
    // TODO get gift card amount from request body
    const claimCode = await createGiftCard(giftCard.amount, URL);
    await sendEmail('support@fuku.tv', email, 'Fuku Prize Redemption', emailBody(giftCard.amount, claimCode));
    return Responses.ok({ message: `Prize redemption was successful, receipt email sent to ${email}` });
  } catch (error) {
    // add points back in case of an gift card error
    // playersTableModel.addPoints(email, giftCard.pointCost);
    return Responses.badRequest(JSON.stringify(error));
  }
};

export default index;
