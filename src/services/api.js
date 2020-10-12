
import axios from 'axios';
const api = axios.create({
    baseURL: 'http://18.205.79.20:8080',
}) 
export default api;