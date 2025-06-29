import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, thunkAPI) => {
    const response = await axios.post('api/products', productData);
    return response.data;
  }
);
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    const response = await axios.get('api/products');
    return response.data;
  }
);
export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({ id, updatedData }, thunkAPI) => {
    const response = await axios.put(`api/products/${id}`, updatedData);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (productId, thunkAPI) => {
    const response = await axios.delete(`api/products/${productId}`);
    return response.data;
  }
);
const productSlice = createSlice({
  name: 'product',
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  extraReducers: (builder) => {
    // add Products
    builder
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.unshift(action.payload);
      })

      // Fetch products 
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;

      })
      // Update Product
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action.payload;
      })
      //Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
  }

});

export default productSlice.reducer;
