import { createSlice } from "@reduxjs/toolkit";
import {
  forgotPassword,
  loadUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfileUser,
} from "../../services/user";

const initialState = {
  auth: false,
  data: null,
  isLoading: false,
  isSuccess: false,
  error: null,
  isUpdating: false,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUpdating: (state) => {
      state.isUpdating = false;
    },
    reset: (state) => initialState,
  },
  extraReducers: {
    // LOGIN
    [loginUser.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.auth = true;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      state.isSuccess = false;
      state.auth = false;
    },
    [loginUser.pending]: (state) => {
      state.data = null;
      state.error = null;
      state.isLoading = true;
    },
    // REGISTER
    [registerUser.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.auth = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      state.isSuccess = false;
      state.auth = false;
    },
    [registerUser.pending]: (state) => {
      state.data = null;
      state.error = null;
      state.isLoading = true;
    },
    // LOAD_USER
    [loadUser.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.auth = true;
    },
    [loadUser.rejected]: (state, { payload }) => initialState,
    [loadUser.pending]: (state) => ({
      ...initialState,
      isLoading: true,
    }),
    // LOGOUT
    [logoutUser.fulfilled]: (state, { payload }) => initialState,
    // UPDATE_PROFILE
    [updateProfileUser.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.isUpdating = true;
      state.auth = true;
    },
    [updateProfileUser.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      state.isSuccess = false;
      state.isUpdating = false;
      state.auth = false;
    },
    [updateProfileUser.pending]: (state) => ({
      isLoading: true,
    }),
    // UPDATE_PASSWORD
    [updatePassword.fulfilled]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      isUpdating: true,
    }),
    [updatePassword.rejected]: (state, { payload }) => ({
      ...state,
      error: payload,
      isLoading: false,
      isUpdating: false,
    }),
    [updatePassword.pending]: (state) => ({
      ...state,
      isLoading: true,
    }),
    // FORGOT PASSWORD
    [forgotPassword.fulfilled]: (state, { payload }) => ({
      message: payload.message,
      isLoading: false,
    }),
    [forgotPassword.rejected]: (state, { payload }) => ({
      error: payload,
      isLoading: false,
    }),
    [forgotPassword.pending]: (state) => ({
      isLoading: true,
    }),
    // RESET PASSWORD
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.auth = true;
      state.data = payload;
      state.isSuccess = true;
      state.isLoading = false;
    },
    [resetPassword.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      state.isSuccess = false;
      state.auth = false;
    },
    [resetPassword.pending]: (state) => {
      state.error = null;
      state.data = null;
      state.isLoading = true;
    },

  },
});

export const { reset, resetUpdating } = userSlice.actions;
export const userSelector = (state) => state.user;
export default userSlice.reducer;
