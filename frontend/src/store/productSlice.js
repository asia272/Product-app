import { createSlice, createAsyncThunk, isPending, isRejected } from '@reduxjs/toolkit';
import axios from 'axios';

export const addProduct = createAsyncThunk('products/addProduct', async (productData) => {
  const response = await axios.post('api/products', productData);
  return response.data;
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('api/products');
  return response.data;
});

export const editProduct = createAsyncThunk('products/editProduct', async ({ id, updatedData }) => {
  const response = await axios.put(`api/products/${id}`, updatedData);
  return response.data;
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (productId) => {
  const response = await axios.delete(`api/products/${productId}`);
  return response.data;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {

    builder
      // add 
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.unshift(action.payload);
      })
      //fetch
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      //edit
      .addCase(editProduct.fulfilled, (state) => {
        state.isLoading = false;

      })
      //delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;

      })
      // pending for all
      .addMatcher(isPending(addProduct, fetchProducts, editProduct, deleteProduct), (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // rejected  for all
      .addMatcher(isRejected(addProduct, fetchProducts, editProduct, deleteProduct), (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export default productSlice.reducer;
