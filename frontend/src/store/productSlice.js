import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (category = '') => {
  const url = category ? `/api/products?category=${category}` : '/api/products';
  console.log('Fetching products with URL:', url);
  const { data } = await axios.get(url);
  return data;
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
});

export const createProduct = createAsyncThunk('products/createProduct', async (productData, { getState }) => {
  const { auth: { userInfo } } = getState();
  const { data } = await axios.post('/api/products', productData, {
    headers: { Authorization: `Bearer ${userInfo.token}` }
  });
  return data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, productData }, { getState }) => {
  const { auth: { userInfo } } = getState();
  const { data } = await axios.put(`/api/products/${id}`, productData, {
    headers: { Authorization: `Bearer ${userInfo.token}` }
  });
  return data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, { getState }) => {
  const { auth: { userInfo } } = getState();
  await axios.delete(`/api/products/${id}`, {
    headers: { Authorization: `Bearer ${userInfo.token}` }
  });
  return id;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: {},
    loading: false,
    error: null,
    selectedCategory: '',
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p._id !== action.payload);
      });
  },
});

export const { clearError, setSelectedCategory } = productSlice.actions;

export default productSlice.reducer;