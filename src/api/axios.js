import axios from 'axios';

export default axios.create({
    baseURL: 'https://backend-turismo-real.herokuapp.com'
});