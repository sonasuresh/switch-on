import axios from 'axios';
import config from '../config/config';

function callAPI(method, url, options) {
    var token = localStorage.getItem('token');
    const axiosConfig = {
        url,
        method,
        baseURL: config.apiURL,
        headers: {
            Authorization: `Bearer ${token}`
        },
        ...options

    }

    return axios(axiosConfig)
}

export default callAPI;