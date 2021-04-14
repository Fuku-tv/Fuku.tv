import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GiftCardCatalogue } from 'fuku.tv-shared/giftCard';
import { getPrizeList, redeemGiftCard } from 'src/state/actions/prize.actions';

interface State {
  giftCardList: GiftCardCatalogue[];
}

const initialState: State = {
  giftCardList: [
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
  ],
};

const prizeSlice = createSlice({
  name: 'PRIZE',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPrizeList.fulfilled, (state, action) => ({
      ...state,
      prizelist: action.payload,
    }));
    builder.addCase(redeemGiftCard.fulfilled, (state, action) => ({
      ...state,
    }));
  },
});

export const { actions } = prizeSlice;

export default prizeSlice.reducer;
