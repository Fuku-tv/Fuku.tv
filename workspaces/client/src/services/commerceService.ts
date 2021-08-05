import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import * as secrets from 'fuku.tv-shared/secrets/getSecret';

import type Stripe from 'stripe';

import Axios from 'axios';
import { getCheckoutUrl } from './fukuApiService';

interface lineItems {
  price: string;
  quantity: number;
  type: string;
}

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

export const redirectToCheckoutSession = async (items: lineItems[], customerEmail: string): Promise<void> => {
  // redirect to checkout page
  try {
    const checkoutUrl = await getCheckoutUrl(items, customerEmail, window.location.href);
    window.location.replace(checkoutUrl);
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
