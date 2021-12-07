import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    },
    REMOVE_CART_ITEM: (state, action) => {
      const id = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== id),
      };
    },
    SHIPPING_INFO: (state, action) => {
      return { ...state, shippingInfo: action.payload };
    },
    RESET_CART: () => ({ cartItems: [], shippingInfo: {} }),
  },
  extraReducers: {},
});

export const { ADD_TO_CART, REMOVE_CART_ITEM, SHIPPING_INFO,RESET_CART } =
  cartSlice.actions;
export const cartSelector = (state) => state.cart;
export default cartSlice.reducer;
