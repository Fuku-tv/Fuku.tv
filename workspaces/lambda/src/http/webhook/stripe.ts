import type { APIGatewayProxyHandler } from 'aws-lambda';
import { Stripe } from 'stripe';
import { playersTableModel } from 'fuku.tv-shared/dynamodb/table';
import * as Responses from '../../common/ApiResponses';

const stripe = new Stripe('sk_test_51HxGG6Gx8BmO5evBad03IoM4XKEbncHHhA61RCm6pryKvtjbrUoQbk7a2sHViOv5s9LnpZbmIjEoRzfVvCsVnSiL00DVxIyf22', {
  apiVersion: '2020-08-27',
});

const webhookSecret = 'whsec_HBf2DDCg0jGYhdrJ4smIGkDUuFAZ8Wd8';

export const index: APIGatewayProxyHandler = async (event, context, callback) => {
  const { domainName, stage } = event.requestContext;

  let stripeEvent: Stripe.Event;

  // try/catch block to verify and parse the webhook request
  try {
    // parse request body, add stripe signature and webhook secret.
    stripeEvent = stripe.webhooks.constructEvent(event.body, event.headers['stripe-signature'], webhookSecret);
  } catch (err) {
    // On error, log and return the error message
    return Responses.badRequest(`Webhook Error: ${err.message}`);
  }

  try {
    // Handle the checkout.session.completed event

    if (stripeEvent.type === 'wdw') {
      const bleh = 123;
    }
    const session = stripeEvent.data.object;

    // Fulfill the purchase...
    // fulfillOrder(session);

    return Responses.ok(session);
  } catch (err) {
    return Responses.badRequest(`Request Error: ${err.message}`);
  }
};

export default index;
