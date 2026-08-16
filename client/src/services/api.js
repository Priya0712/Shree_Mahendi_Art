import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://shree-mahendi-art.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // DO NOT redirect to login if the 401 was from the login endpoint itself!
    const isLoginEndpoint = err.config?.url?.includes('/auth/login');
    if (err.response?.status === 401 && !isLoginEndpoint) {
      localStorage.removeItem('adminToken');
      const adminLogin = (import.meta.env.VITE_ADMIN_PATH || '/secure-yk-admin') + '/login';
      window.location.href = adminLogin;
    }
    return Promise.reject(err);
  }
);

export default api;
