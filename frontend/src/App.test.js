import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App.jsx';
import authSlice from './store/authSlice';
import productSlice from './store/productSlice';
import cartSlice from './store/cartSlice';
import orderSlice from './store/orderSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});

test('renders app', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
