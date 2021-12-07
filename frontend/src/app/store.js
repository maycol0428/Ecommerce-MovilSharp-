import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { productApi } from "../services/product";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";
import orderReducer from "./features/orderSlice";
import reviewReducer from "./features/review/reviewSlice";
import adminReducer from "./features/admin/adminSlice";
export const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    review: reviewReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});
setupListeners(store.dispatch);
