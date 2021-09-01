import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPrices, redirectToCheckoutSession } from 'src/services/commerceService';
import type Stripe from 'stripe';
import type { RootState } from '../store';

export const getProductList = createAsyncThunk('GET_PRODUCT_LIST', async () => {
  const Prices = await getPrices();

  console.log('Prices', Prices);
  const productList = Prices.map((price) => {
    const product = price.product as Stripe.Product;
    console.log('product', product);
    return {
      name: product.name,
      description: product.description,
      imgUrl: product.images[0],
      price: parseFloat((price.unit_amount / 100).toFixed(2)),
      priceId: price.id,
      type: price.type,
    };
  });

  return productList;
});

export const checkout = createAsyncThunk<unknown, unknown, { state: RootState }>('CHECKOUT', async (items: any, thunkAPI) => {
  const customerEmail = thunkAPI.getState().auth.email;
  await redirectToCheckoutSession(items, customerEmail);
});
