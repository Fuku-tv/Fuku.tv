import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getProductList } from '../actions/commerce.actions';

interface State {
  productList: Product[];
}

interface Product {
  name: string;
  description: string;
  imgUrl: string;
  price: number;
  priceId: string;
}

const initialState: State = {
  productList: [],
};

const commerceSlice = createSlice({
  name: 'COMMERCE',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.fulfilled, (state, action) => {
        return {
          ...state,
          productList: action.payload,
        };
      })
      .addCase(getProductList.rejected, (state, action) => {
        return {
          ...state,
        };
      });
  },
});

export const { actions } = commerceSlice;

export default commerceSlice.reducer;
