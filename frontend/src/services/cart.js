import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./axios";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SHIPPING_INFO,
} from "../app/features/cartSlice";
export const addItemsToCart = createAsyncThunk(
  "cart/addItemsToCart",
  async ({ id, quantity }, { getState, dispatch }) => {
    const { data } = await api.get(`/api/v1/product/${id}`);
    dispatch(
      ADD_TO_CART({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images.length > 0 ? data.product.images[0].url : "",
        stock: data.product.Stock,
        quantity,
      })
    );
    const { cart } = getState();
    localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
  }
);
export const removeItemsFromCart = createAsyncThunk(
  "cart/removeItemsFromCart",
  async (id, { getState, dispatch }) => {
    dispatch(REMOVE_CART_ITEM(id));
    const { cart } = getState();
    localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
  }
);
export const saveShippingInfo = createAsyncThunk(
  "cart/saveShippingInfo",
  async (data, { dispatch, getState }) => {
    dispatch(SHIPPING_INFO(data));
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  }
);
