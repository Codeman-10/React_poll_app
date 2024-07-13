import axios from 'axios';

const instance = axios.create({
  baseURL: window.location.origin,
  // other axios options
});

export default instance;
