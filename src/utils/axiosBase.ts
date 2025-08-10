import axios from 'axios';

const axiosBase = axios.create({
  baseURL: 'https://localhost:7016',
});

export default axiosBase;
