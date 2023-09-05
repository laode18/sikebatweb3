/* eslint-disable prettier/prettier */
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Update this URL with your backend server URL
});

export default instance;
