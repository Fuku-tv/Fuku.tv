import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPrices, redirectToCheckout } from 'src/services/commerceService';
import Stripe from 'stripe';
import { RootState } from '../store';
import type { AppThunk } from './helpers/appThunk';

export const getProductList = createAsyncThunk('GET_PRODUCT_LIST', async () => {
  const Prices = await getPrices();

  const productList = Prices.map((price) => {
    const product = price.product as Stripe.Product;
    return {
      name: product.name,
      description: product.description,
      imgUrl: product.images[0],
      price: parseFloat((price.unit_amount / 100).toFixed(2)),
      priceId: price.id,
    };
  });
  return productList;
});

export const checkout = createAsyncThunk<unknown, unknown, { state: RootState }>('CHECKOUT', async (items: any, thunkAPI) => {
  const customerEmail = thunkAPI.getState().auth.email;
  await redirectToCheckout(items, customerEmail);
});