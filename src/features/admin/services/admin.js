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

const createService = async (service) => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.post(
      `https://dev.thabicare.zenix.com.vn/api/v1/services/`,
      service,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("L��i khi tạo dịch vụ:", error);
    throw error;
  }
};

const createStatus = async (status) => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.post(
      `https://dev.thabicare.zenix.com.vn/api/v1/customer-status/`,
      status,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("L��i khi tạo trạng thái:", error);
    throw error;
  }
};

const createSource = async (source) => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.post(
      `https://dev.thabicare.zenix.com.vn/api/v1/customer-source/`,
      source,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("L��i khi tạo source:", error);
    throw error;
  }
};

const createSocialMedia = async (social) => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.post(
      `https://dev.thabicare.zenix.com.vn/api/v1/customer-social/`,
      social,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("L��i khi tạo source:", error);
    throw error;
  }
};

const getService = async () => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.get(
      `https://dev.thabicare.zenix.com.vn/api/v1/services/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("Lỗi khi lấy dịch vụ:", error);
    throw error;
  }
};

const getStatus = async () => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.get(
      `https://dev.thabicare.zenix.com.vn/api/v1/customer-status/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("Lỗi khi lấy trạng thái:", error);
    throw error;
  }
};

const getSource = async () => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.get(
      `https://dev.thabicare.zenix.com.vn/api/v1/customer-source/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("Lỗi khi lấy nguồn khách hàng:", error);
    throw error;
  }
};

const getSocialMedia = async () => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.get(
      `https://dev.thabicare.zenix.com.vn/api/v1/customer-social/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("Lỗi khi lấy nguồn mạng xã hội:", error);
    throw error;
  }
};

export {
  useAuth,
  getUser,
  getUserFromLocalStorage,
  createUser,
  createService,
  createSource,
  createSocialMedia,
  createStatus,
  getService,
  getStatus,
  getSource,
  getSocialMedia,
};
