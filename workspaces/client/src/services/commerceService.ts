import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { env } from 'fuku.tv-shared';

import type Stripe from 'stripe';

import Axios from 'axios';

const STRIPE_API_KEY = env.stripeApiKey();
const STRIPE_API_SECRET = env.stripeApiSecret();

const StripeAPI = Axios.create({
  baseURL: 'https://api.stripe.com',
  headers: {
    Authorization: `Bearer ${STRIPE_API_SECRET}`,
  },
});

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
  try {
    const test = await StripeAPI.get('/v1/prices', { params: { 'expand[]': 'data.product', active: true } });
    return test.data.data;
  } catch (err) {
    console.log('error: ', err);
    throw err;
  }
};

export const redirectToCheckout = async (items: [{ price: string; quantity: number }], customerEmail: string): Promise<void> => {
  try {
    const stripeClient = await loadStripe(STRIPE_API_KEY);
    await stripeClient.redirectToCheckout({
      successUrl: `${window.location.href}/success`,
      cancelUrl: window.location.href,
      lineItems: items,
      mode: 'payment',
      customerEmail,
    });
  } catch (err) {
    console.log('error: ', err);
    throw err;
  }
};

export default {};
