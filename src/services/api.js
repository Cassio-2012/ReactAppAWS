
import axios from 'axios';
const api = axios.create({
    baseURL: 'http://ec2-18-205-79-20.compute-1.amazonaws.com:8080',
}) 
export default api;