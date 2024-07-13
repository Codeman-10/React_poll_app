import axios from 'axios';

const instance = axios.create({
  baseURL: "https://polling-web-service.onrender.com/",
  // other axios options
});

export default instance;
