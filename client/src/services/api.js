import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api', // e.g. https://shree-mahendi-api.onrender.com/api or proxy
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('adminToken');
      const adminLogin = (import.meta.env.VITE_ADMIN_PATH || '/secure-yk-admin') + '/login';
      window.location.href = adminLogin;
    }
    return Promise.reject(err);
  }
);

export default api;
