import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dukansarthibackend-production.up.railway.app', // Full URL with protocol
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
