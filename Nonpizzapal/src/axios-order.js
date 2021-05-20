import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://WOpizzapal.firebasedatabase.app/'
});

export default instance;