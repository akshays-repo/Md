import Axios from 'axios';
import store from 'store';
import { ValidateToken } from './validatetoken';

export const axiosInstance = Axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL1,
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_BASE_URL_PROD
      : process.env.REACT_APP_BASE_URL_DEV,
});
// Add a request interceptor
axiosInstance.interceptors.request.use(
  async function(config) {
    const [result] = await ValidateToken();
    if (result) {
      config.headers['Authorization'] = store.get('token');
      return config;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);
