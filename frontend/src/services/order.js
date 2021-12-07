import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./axios";

export const newOrder = createAsyncThunk(
  "order/newOrder",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/v1/order/new", data);
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
export const myOrders = createAsyncThunk(
  "order/myOrders",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/v1/orders/me");
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
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
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
