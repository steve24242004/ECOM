import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get all users
export const getUsers = createAsyncThunk('admin/getUsers', async (_, { getState, rejectWithValue }) => {
  try {
    const { auth: { userInfo } } = getState();
    const response = await fetch('/api/users', {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Delete user
export const deleteUser = createAsyncThunk('admin/deleteUser', async (id, { getState, rejectWithValue }) => {
  try {
    const { auth: { userInfo } } = getState();
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${userInfo.token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Create product
export const createProduct = createAsyncThunk('admin/createProduct', async (productData, { getState, rejectWithValue }) => {
  try {
    const { auth: { userInfo } } = getState();
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Update product
export const updateProduct = createAsyncThunk('admin/updateProduct', async ({ id, productData }, { getState, rejectWithValue }) => {
  try {
    const { auth: { userInfo } } = getState();
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Delete product
export const deleteProduct = createAsyncThunk('admin/deleteProduct', async (id, { getState, rejectWithValue }) => {
  try {
    const { auth: { userInfo } } = getState();
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${userInfo.token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;