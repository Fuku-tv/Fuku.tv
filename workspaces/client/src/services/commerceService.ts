import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import type Stripe from 'stripe';

import Axios from 'axios';

const STRIPE_API_KEY = 'pk_test_51HxGG6Gx8BmO5evBcDbYjClczRZa0rC96ZiA3ZFyn5ErewXeH2TgAs9cseKW6mT1mMpfRepbtbXEgrPEWovaHbn100wlrLXvff';
const STRIPE_API_SECRET = 'rk_test_51HxGG6Gx8BmO5evBLmxbuvgdsXyOf6BJLQKlzl5lEzFTBi1lUFixP09FJ6dPZUeWXzjn2cTF73zDVnTjGQEOqcH300qsohCbx9';

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
    const test = await StripeAPI.get('/v1/prices', { params: { 'expand[]': 'data.product' } });
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
      successUrl: window.location.href,
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
