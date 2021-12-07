import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./axios";

export const loginUser = createAsyncThunk(
  "user/login",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("/api/v1/login", data);
      return response.data;
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
export const registerUser = createAsyncThunk(
  "user/register",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("/api/v1/register", data);
      return response.data;
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
export const loadUser = createAsyncThunk("user/me", async (data, thunkAPI) => {
  try {
    const response = await api.get("/api/v1/me");
    return response.data;
  } catch (err) {
    let { statusText, data } = err.response;
    let message = statusText;
    if (data?.error) {
      message = data?.error;
    }
    return thunkAPI.rejectWithValue(message);
  }
});
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (data, thunkAPI) => {
    try {
      const response = await api.get("/api/v1/logout");
      return response.data;
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
export const updateProfileUser = createAsyncThunk(
  "user/updateProfile",
  async (data, thunkAPI) => {
    try {
      const response = await api.put("/api/v1/me/update", data);
      return response.data;
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
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (data, thunkAPI) => {
    try {
      const response = await api.put("/api/v1/password/update", data);
      return response.data;
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
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("/api/v1/password/forgot", data);
      return response.data;
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
export const resetPassword = createAsyncThunk(
  "user/forgotPassword",
  async ({ token, password, confirmPassword }, thunkAPI) => {
    try {
      const response = await api.put(`/api/v1/password/reset/${token}`, {
        password,
        confirmPassword,
      });
      return response.data;
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
