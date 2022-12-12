import axios from 'axios';

export default axios.create({
    baseURL: 'https://backend-turismo-real.herokuapp.com' /* 'http://192.168.1.124:8000' */
});