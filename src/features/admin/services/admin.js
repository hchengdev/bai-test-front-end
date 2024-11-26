import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const getTokenFromLocalStorage = () => {
  const user = window.localStorage.getItem("sns_user");
  if (user) {
    try {
      const parsedUser = JSON.parse(user);
      return parsedUser.access_token;
    } catch (error) {
      console.error(
        "Lỗi khi phân tích dữ liệu người dùng từ localStorage",
        error
      );
      return null;
    }
  }
  return null;
};

const getUserFromLocalStorage = () => {
  const user = window.localStorage.getItem("sns_user");
  if (user) {
    try {
      const parsedUser = JSON.parse(user);
      return parsedUser.user.username;
    } catch (error) {
      console.error(
        "Lỗi khi phân tích dữ liệu người dùng từ localStorage",
        error
      );
      return null;
    }
  }
  return null;
};

const isTokenExpired = (token) => {
  if (!token) return true;

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  return decodedToken.exp < currentTime;
};

const useAuth = () => {
  const navigate = useNavigate();

  const checkTokenAndRedirect = () => {
    const token = getTokenFromLocalStorage();

    if (!token || isTokenExpired(token)) {
      navigate("/login");
      return false;
    }
    return true;
  };

  return checkTokenAndRedirect;
};

const getUser = async () => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.get(
      `https://dev.thabicare.zenix.com.vn/api/v1/customers/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createUser = async (userData) => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.post(
      `https://dev.thabicare.zenix.com.vn/api/v1/customers/`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo khách hàng:", error);
    throw error;
  }
};

export { useAuth, getUser, getUserFromLocalStorage, createUser };