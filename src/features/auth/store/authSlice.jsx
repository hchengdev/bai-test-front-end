import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../services/auth";

const getUserFromLocalStorage = () => {
  return window.localStorage.getItem("sns_user")
    ? JSON.parse(window.localStorage.getItem("sns_user"))
    : null;
};

const initialState = {
  user: getUserFromLocalStorage(),
  isAuthenticated: getUserFromLocalStorage() ? true : false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      window.localStorage.removeItem("sns_user");
      window.localStorage.removeItem("hasSeenRequests");
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
      })

      // register
      .addCase(register.fulfilled, () => {})
      .addCase(register.rejected, (_, action) => {});
  },
});

export const { handleLoginFail, handleLoginSuccess, logout, setLoading } =
  authSlice.actions;
export default authSlice.reducer;
