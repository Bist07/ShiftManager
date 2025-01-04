// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
