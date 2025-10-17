import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import productSlice from './productSlice';
import cartSlice from './cartSlice';
import orderSlice from './orderSlice';
import adminSlice from './adminSlice';
import categorySlice from './categorySlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    cart: cartSlice,
    order: orderSlice,
    admin: adminSlice,
    categories: categorySlice,
  },
});

export default store;