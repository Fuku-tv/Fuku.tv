import axios from 'axios';
import { env } from 'fuku.tv-shared';
import type { GiftCardCatalogue } from 'fuku.tv-shared/giftCard';

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

export const getGiftCards = async (token: string): Promise<GiftCardCatalogue[]> => [
  {
    amount: 10,
    pointCost: 1000,
  },
  {
    amount: 25,
    pointCost: 2500,
  },
  {
    amount: 50,
    pointCost: 5000,
  },
  {
    amount: 100,
    pointCost: 10000,
  },
];

export const validateGiftCard = (): void => {};
