import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://dev.thabicare.zenix.com.vn/api/v1/user-login/",
        {
          username,
          password,
        }
      );
      if (response.status === 200) {
        window.localStorage.setItem("sns_user", JSON.stringify(response.data));
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          return rejectWithValue("The account has been locked!");
        }
        return rejectWithValue(error.response.data || "An error occurred!");
      }
      return rejectWithValue("Wrong username or password!");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://dev.thabicare.zenix.com.vn/api/v1/create-user-account/",
        {
          username,
          password,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue("bad credentials!");
    }
  }
);

export default { login, register };
