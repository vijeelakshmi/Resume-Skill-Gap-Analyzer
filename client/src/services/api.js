import axios from "axios";
import { API_URL } from "../config";

// ✅ Create Axios instance
const api = axios.create({
  baseURL: API_URL, // 👉 should be http://localhost:5000/api
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ important if using cookies/auth
});

// ======================
// ✅ REQUEST INTERCEPTOR
// ======================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// ======================
// ✅ RESPONSE INTERCEPTOR
// ======================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔐 Handle unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    // 🔍 Log error for debugging
    console.error("API Error:", error.response || error.message);

    return Promise.reject(error);
  }
);

export default api;