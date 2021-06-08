import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import * as secrets from 'fuku.tv-shared/secrets/getSecret';

import type Stripe from 'stripe';

import Axios from 'axios';

// const STRIPE_API_KEY = secrets.stripeApiKey();
// const STRIPE_API_SECRET = secrets.stripeApiSecret();

// export const GetProducts = async (): Promise<Stripe.Product[]> => {
//   try {
//     const test = await StripeAPI.get<Stripe.Price[]>('/v1/prices', { params: { 'expand[]': 'data.product' } });
//     return test.data;
//   } catch (err) {
//     console.log('error: ', err);
//     throw err;
//   }
// };

export const getPrices = async (): Promise<Stripe.Price[]> => {
  const StripeAPI = await getAPI();

  try {
    const test = await StripeAPI.get('/v1/prices', { params: { 'expand[]': 'data.product', active: true } });
    return test.data.data;
  } catch (err) {
    console.log('error: ', err);
    throw err;
  }
};

export const redirectToCheckout = async (items: [{ price: string; quantity: number }], customerEmail: string): Promise<void> => {
  const StripeAPI = await getAPI();
  let customerId: string;
  // check if email address already exists
  try {
    const response = StripeAPI.get(`/v1/customers?email=${customerEmail}`);
    customerId = (await response).data.data[0].id;
    console.log('ID: ', customerId);
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }

  // redirect to checkout page
  try {
    const STRIPE_API_KEY = await secrets.stripeApiKey();
    const stripeClient = await loadStripe(STRIPE_API_KEY);
    await stripeClient.redirectToCheckout({
      successUrl: `${window.location.href}/success`,
      cancelUrl: window.location.href,
      lineItems: items,
      mode: 'payment',
      customerEmail,
      clientReferenceId: customerId,
    });
  } catch (err) {
    console.log('error: ', err);
    throw err;
  }
};

/**
 * Async API client creator for stripe
 * @returns StripeAPI
 */
const getAPI = async () => {
  const STRIPE_API_SECRET = await secrets.stripeApiSecret();
  return Axios.create({
    baseURL: 'https://api.stripe.com',
    headers: {
      Authorization: `Bearer ${STRIPE_API_SECRET}`,
    },
  });
};

export default {};
