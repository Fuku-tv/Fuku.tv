import axios from 'axios';
import { env } from 'fuku.tv-shared';

const FukuAPI = axios.create({
  baseURL: env.fukuApiServerURL(),
});

export const getLeaderboard = async () => {
  const result = await FukuAPI.get('/leaderboard');

  return result.data;
};

export const getCheckoutUrl = async (items: any[], customerEmail: string, clientUrl: string): Promise<string> => {
  const result = await FukuAPI.post('/checkout', { items, customerEmail, clientUrl });

  return result.data.url;
};

export default {};
