import { createSlice } from "@reduxjs/toolkit";
import { getOrderDetails, myOrders, newOrder } from "../../services/order";

const initialState = {
  orders: [],
  order: null,
  error: null,
  loading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    CLEAR_ERRORS: (state, action) => ({
      ...state,
      error: null,
    }),
  },
  extraReducers: {
    // NEW ORDER
    [newOrder.fulfilled]: (state, { payload }) => ({
      ...state,
      order: payload,
      loading: false,
    }),
    [newOrder.rejected]: (state, { payload }) => ({
      ...state,
      error: payload,
      loading: false,
    }),
    [newOrder.pending]: (state) => ({
      ...state,
      loading: true,
    }),
    // MY ORDERS
    [myOrders.fulfilled]: (state, { payload }) => ({
      ...state,
      orders: payload,
      loading: false,
    }),
    [myOrders.rejected]: (state, { payload }) => ({
      ...state,
      error: payload,
      loading: false,
    }),
    [myOrders.pending]: (state) => ({
      ...state,
      loading: true,
    }),
    // ORDER DETAIL
    [getOrderDetails.fulfilled]: (state, { payload }) => ({
      ...state,
      order: payload,
      loading: false,
    }),
    [getOrderDetails.rejected]: (state, { payload }) => ({
      ...state,
      error: payload,
      loading: false,
    }),
    [getOrderDetails.pending]: (state) => ({
      ...state,
      loading: true,
    }),
  },
});

export const { CLEAR_ERRORS } = orderSlice.actions;
export const orderSelector = (state) => state.order;
export default orderSlice.reducer;
