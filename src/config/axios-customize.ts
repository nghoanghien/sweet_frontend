import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Request Interceptor
instance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  // Set headers
  config.headers.Accept = "application/json";
  config.headers["Content-Type"] = "application/json; charset=utf-8";

  return config;
});

// Response Interceptor
instance.interceptors.response.use(
  (response) => response.data ?? response,
  (error) => error?.response?.data ?? Promise.reject(error)
);

export default instance;
