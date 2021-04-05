import axios from 'axios';
import { env } from 'fuku.tv-shared';

export const createGiftCard = async (amount: number, token: string): Promise<void> => {
  const FukuAPI = axios.create({
    baseURL: env.fukuApiServerURL(),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await FukuAPI.post('/giftcard', { amount });

  console.log(JSON.stringify(response));
};

export const validateGiftCard = (): void => {};
