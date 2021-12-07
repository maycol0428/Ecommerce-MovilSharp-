import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteOrder,
  deleteProductAdmin,
  getAllOrdersAdmin,
  getAllProductsAdmin,
  getAllUsersAdmin,
  getOrderDetails,
  getProductDetails,
  updateOrder,
} from "./adminActions";

const initialState = {
  products: [],
  product: null,
  users: [],
  orders: [],
  order: null,
  error: null,
  loading: false,
  isDeleted: false,
  isUpdating: false,
  isSuccess: false,
};

const adminSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetError: (state) => ({
      ...state,
      error: null,
    }),
    resetIsDeleted: (state) => ({
      isDeleted: false,
    }),
    resetIsSuccess: (state) => ({
      isDeleted: false,
    }),
    resetUpdating: (state) => ({
      isUpdating: false,
    }),
    reset: (state) => initialState,
  },
  extraReducers: {
    // LOGIN
    [getAllProductsAdmin.fulfilled]: (state, { payload }) => ({
      ...state,
      products: payload,
      loading: false,
    }),
    [getAllProductsAdmin.rejected]: (state, { payload }) => ({
      ...state,
      error: payload,
      loading: false,
    }),
    [getAllProductsAdmin.pending]: (state, { payload }) => ({
      ...state,
      loading: true,
    }),
    // GET ALL USERS ADMIN
    [getAllUsersAdmin.fulfilled]: (state, { payload }) => ({
      ...state,
      users: payload,
      loading: false,
    }),
    [getAllUsersAdmin.rejected]: (state, { payload }) => ({
      ...state,
      error: payload,
      loading: false,
    }),
    [getAllUsersAdmin.pending]: (state) => ({
      ...state,
      loading: true,
    }),
    // ORDER ALL ADMIN
    [getAllOrdersAdmin.fulfilled]: (state, { payload }) => ({
      ...state,
      orders: payload,
      loading: false,
    }),
    [getAllOrdersAdmin.rejected]: (state, { payload }) => ({
      ...state,
      error: payload,
      loading: false,
    }),
    [getAllOrdersAdmin.pending]: (state) => ({
      ...state,
      loading: true,
    }),
    // DELETE PRODUC ADMIN
    [deleteProductAdmin.fulfilled]: (state, { payload }) => ({
      ...state,
      orders: payload,
      isDeleted: true,
      loading: false,
    }),
    [deleteProductAdmin.rejected]: (state, { payload }) => ({
      ...state,
      error: payload,
      loading: false,
    }),
    [deleteProductAdmin.pending]: (state) => ({
      ...state,
      loading: true,
    }),
    // PRODUCT DETAIL ADMIN
    [getProductDetails.fulfilled]: (state, { payload }) => ({
      ...state,
      product: payload,
      loading: false,
    }),
    [getProductDetails.rejected]: (state, { payload }) => ({
      ...state,
      error: payload,
      loading: false,
    }),
    [getProductDetails.pending]: (state) => ({
      ...state,
      loading: true,
    }),
    // NEW  PRODUCT
    [createProduct.fulfilled]: (state, { payload }) => ({
      ...state,
      isSuccess: true,
      loading: false,
    }),
    [createProduct.rejected]: (state, { payload }) => ({
      ...state,
      error: payload,
      loading: false,
    }),
    [createProduct.pending]: (state) => ({
      ...state,
      loading: true,
    }),
    // GET ORDER
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
    // UPDATE STATUS ORDER
    [updateOrder.fulfilled]: (state, { payload }) => ({
      ...state,
      success: payload,
      loading: false,
    }),
    [updateOrder.rejected]: (state, { payload }) => ({
      ...state,
      error: payload,
      loading: false,
    }),
    [updateOrder.pending]: (state) => ({
      ...state,
      loading: true,
    }),
    // UPDATE STATUS ORDER
    [deleteOrder.fulfilled]: (state, { payload }) => ({
      ...state,
      isDeleted: true,
      loading: false,
    }),
    [deleteOrder.rejected]: (state, { payload }) => ({
      ...state,
      error: payload,
      loading: false,
    }),
    [deleteOrder.pending]: (state) => ({
      ...state,
      loading: true,
    }),
  },
});

export const {
  resetError,
  reset,
  resetIsDeleted,
  resetUpdating,
  resetIsSuccess,
} = adminSlice.actions;
export const adminSelector = (state) => state.admin;
export default adminSlice.reducer;
