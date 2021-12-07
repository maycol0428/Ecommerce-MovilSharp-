import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios";

export const newReview = createAsyncThunk(
  "review/newReview",
  async (data, thunkAPI) => {
    try {
      const response = await api.put("/api/v1/review", data);
      return response.data.success;
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
