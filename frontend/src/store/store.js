import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import productSlice from './productSlice';
import cartSlice from './cartSlice';
import orderSlice from './orderSlice';
import adminSlice from './adminSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    cart: cartSlice,
    order: orderSlice,
    admin: adminSlice,
  },
});

export default store;