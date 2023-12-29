import axios from 'axios';
import { REACT_APP_LOCALHOST_URL } from './Common';

const instance = axios.create({
  baseURL: `${REACT_APP_LOCALHOST_URL}/api/v1`,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true, // Include credentials (cookies)
});

// Add a request interceptor to set the Authorization2 header
instance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('access');
  if (authToken) {
    config.headers['Authorization2'] = authToken;
  }
  return config;
});

export default instance;
