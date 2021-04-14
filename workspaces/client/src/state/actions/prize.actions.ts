import { createAsyncThunk } from '@reduxjs/toolkit';
import * as giftCardService from 'src/services/giftCardService';
import { RootState } from '../store';

export const getPrizeList = createAsyncThunk<unknown, unknown, { state: RootState }>('GET_PRIZE_LIST', async (_ = null, thunkAPI) => {
  const prizeList = await giftCardService.getGiftCards(thunkAPI.getState().auth.accessToken);

  return prizeList;
});

export const redeemGiftCard = createAsyncThunk<unknown, unknown, { state: RootState }>('CHECKOUT', async (amount: number, thunkAPI) => {
  giftCardService.createGiftCard(amount, thunkAPI.getState().auth.accessToken);
});
