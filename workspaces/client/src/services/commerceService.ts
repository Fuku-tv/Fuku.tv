import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import * as secrets from 'fuku.tv-shared/secrets/getSecret';

import type Stripe from 'stripe';

import Axios from 'axios';
import { getCheckoutUrl, getProducts } from './fukuApiService';

interface lineItems {
  price: string;
  quantity: number;
  type: string;
}

export const getPrices = async (): Promise<Stripe.Price[]> => {
  try {
    const products = await getProducts();
    return products;
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
