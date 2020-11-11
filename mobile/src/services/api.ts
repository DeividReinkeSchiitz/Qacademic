import axios from 'axios';

const api = axios.create({ baseURL: 'https://qacademic-api.herokuapp.com/' });

export default api;
