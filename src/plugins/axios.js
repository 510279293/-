import axios from 'axios';

export default axios.create({
  // Request Config
  baseURL: '/api/v1/back',
});
