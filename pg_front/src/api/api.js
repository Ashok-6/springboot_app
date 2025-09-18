// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8081/api/admin", // Backend base URL
// });

// export default api;       **********user register

// src/services/adminApi.js
import axios from "axios";

const API_URL = "http://localhost:8081/admin"; // adjust port if different

// Axios instance (optional, for reuse)
const api = axios.create({
  baseURL: API_URL,
});

// Register admin
export const registerAdmin = async (adminName, password) => {
  const response = await api.post("/register", { adminName, password });
  return response.data;
};

// Login admin & get token
export const loginAdmin = async (adminName, password) => {
  const response = await api.post("/login", { adminName, password });

  // Save token in localStorage
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

// Get logged-in admin details
export const getAdminDetails = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Logout admin
export const logoutAdmin = () => {
  localStorage.removeItem("token");
};

export default api;
