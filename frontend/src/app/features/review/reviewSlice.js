import { createSlice } from "@reduxjs/toolkit";
import { newReview } from "./reviewAction";

const initialState = {
  review: null,
  reviews: [],
  loading: false,
  error: null,
  success: false,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    resetError: (state) => ({
      ...state,
      error: null,
    }),
    reset: (state) => initialState,
  },
  extraReducers: {
    // LOGIN
    [newReview.fulfilled]: (state, { payload }) => ({
      ...state,
      success: payload,
      loading: false,
    }),
    [newReview.rejected]: (state, { payload }) => ({
      ...state,
      error: payload,
      loading: false,
    }),
    [newReview.pending]: (state, { payload }) => ({
      ...state,
      loading: true,
    }),
  },
});

export const { resetError ,reset} = reviewSlice.actions;
export const reviewSelector = (state) => state.review;
export default reviewSlice.reducer;
