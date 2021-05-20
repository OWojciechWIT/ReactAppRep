import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://yourdatabase.firebasedatabase.app/'
});

export default instance;