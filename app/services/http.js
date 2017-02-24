import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://woowha-1370.appspot.com/api',
  timeout: 3000
});

export default instance;