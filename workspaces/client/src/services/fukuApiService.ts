import axios from 'axios';
import { fukuApiServerURL } from 'fuku.tv-shared/env';
import type { Stripe } from 'stripe';

const FukuAPI = axios.create({
  baseURL: fukuApiServerURL(),
});

export const getLeaderboard = async () => {
  const result = await FukuAPI.get('/leaderboard');

  return result.data;
};

export const getuserProfile = async (token: string) => {
  FukuAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
  const result = await FukuAPI.get('/user');

  return result.data;
};

export const getCheckoutUrl = async (items: any[], customerEmail: string, clientUrl: string): Promise<string> => {
  const result = await FukuAPI.post('/checkout', { items, customerEmail, clientUrl });

  return result.data.url;
};

export const getProducts = async (): Promise<Stripe.Price[]> => {
  const result = await FukuAPI.get('/products');

  return result.data;
};
