import axios from 'axios';

const axiosBase = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default axiosBase;
