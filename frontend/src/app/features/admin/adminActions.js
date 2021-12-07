import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../axios";

export const getAllProductsAdmin = createAsyncThunk(
  "admin/getAllProductsAdmin",
  async (data, thunkAPI) => {
    try {
      const response = await api.get("/api/v1/admin/products");
      return response.data.products;
    } catch (err) {
      let { statusText, data } = err.response;
      let message = statusText;
      if (data?.error) {
        message = data?.error;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllUsersAdmin = createAsyncThunk(
  "admin/getAllUsersAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/v1/admin/users");
      return response.data.users;
    } catch (err) {
      let { statusText, data } = err.response;
      let message = statusText;
      if (data?.error) {
        message = data?.error;
      }
      return rejectWithValue(message);
    }
  }
);

export const getAllOrdersAdmin = createAsyncThunk(
  "admin/getAllOrdersAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/v1/admin/orders");
      return response.data.orders;
    } catch (err) {
      let { statusText, data } = err.response;
      let message = statusText;
      if (data?.error) {
        message = data?.error;
      }
      return rejectWithValue(message);
    }
  }
);
export const deleteProductAdmin = createAsyncThunk(
  "admin/deleteProductAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/v1/admin/product/${id}`);
      return response.data.orders;
    } catch (err) {
      let { statusText, data } = err.response;
      let message = statusText;
      if (data?.error) {
        message = data?.error;
      }
      return rejectWithValue(message);
    }
  }
);
export const getProductDetails = createAsyncThunk(
  "admin/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/v1/product/${id}`);
      return response.data.product;
    } catch (err) {
      let { statusText, data } = err.response;
      let message = statusText;
      if (data?.error) {
        message = data?.error;
      }
      return rejectWithValue(message);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async (
    { productId, name, price, description, category, stock, images },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/api/v1/admin/product/${productId}`, {
        name,
        price,
        description,
        category,
        stock,
      });
      return response.data.product;
    } catch (err) {
      let { statusText, data } = err.response;
      let message = statusText;
      if (data?.error) {
        message = data?.error;
      }
      return rejectWithValue(message);
    }
  }
);
export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (
    { name, price, description, category, stock, images },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(`/api/v1/admin/product/new`, {
        name,
        price,
        description,
        category,
        stock,
      });
      return response.data.product;
    } catch (err) {
      let { statusText, data } = err.response;
      let message = statusText;
      if (data?.error) {
        message = data?.error;
      }
      return rejectWithValue(message);
    }
  }
);
export const deleteOrder = createAsyncThunk(
  "admin/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/v1/admin/order/${id}`);
      return response.data.product;
    } catch (err) {
      let { statusText, data } = err.response;
      let message = statusText;
      if (data?.error) {
        message = data?.error;
      }
      return rejectWithValue(message);
    }
  }
);
export const getOrderDetails = createAsyncThunk(
  "admin/getOrderAdminDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/v1/order/${id}`);
      return response.data.order;
    } catch (err) {
      let { statusText, data } = err.response;
      let message = statusText;
      if (data?.error) {
        message = data?.error;
      }
      return rejectWithValue(message);
    }
  }
);
export const updateOrder = createAsyncThunk(
  "admin/updateOrder",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/v1/admin/order/${id}`, { status });
      return response.data.success;
    } catch (err) {
      let { statusText, data } = err.response;
      let message = statusText;
      if (data?.error) {
        message = data?.error;
      }
      return rejectWithValue(message);
    }
  }
);
