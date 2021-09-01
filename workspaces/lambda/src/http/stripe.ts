import type { APIGatewayProxyHandler } from 'aws-lambda';
import { stripeApiSecret } from 'fuku.tv-shared/secrets/getSecret';
import Stripe from 'stripe';

import * as Responses from '../common/ApiResponses';

interface lineItems {
  price: string;
  quantity: number;
  type: string;
}

export const checkout: APIGatewayProxyHandler = async (event, context, callback) => {
  const { domainName, stage, identity } = event.requestContext;
  const { items, customerEmail, clientUrl }: { items: lineItems[]; customerEmail: string; clientUrl: string } = JSON.parse(event.body);
  const env = process.env.LAMBDA_ENV;

  try {
    const stripe = new Stripe(await stripeApiSecret(), {
      apiVersion: '2020-08-27',
    });

    const customerList = await stripe.customers.list({ limit: 1, email: customerEmail });

    const customer = customerList.data.length === 0 ? await stripe.customers.create({ email: customerEmail }) : customerList.data[0];

    const customerId = customer.id;
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: items[0].type === 'one_time' ? 'payment' : 'subscription',
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
        price: item.price,
        quantity: item.quantity,
      })),
      // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
      // the actual Session ID is returned in the query parameter when your customer
      // is redirected to the success page.
      success_url: `${clientUrl}/success`,
      cancel_url: clientUrl,
    });

    return Responses.ok({ url: session.url });
  } catch (error) {
    callback(error);
    return Responses.badRequest({ message: 'message could not be received', error });
  }
};

export const products: APIGatewayProxyHandler = async (event, context, callback) => {
  try {
    const stripe = new Stripe(await stripeApiSecret(), {
      apiVersion: '2020-08-27',
    });

    const productList = await stripe.prices.list({ expand: ['data.product'], active: true });

    return Responses.ok([...productList.data]);
  } catch (error) {
    callback(error);
    return Responses.badRequest({ message: 'message could not be received', error });
  }
};
