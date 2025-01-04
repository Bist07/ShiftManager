// src/api/locationApi.js
import axiosInstance from './axiosInstance';

export const fetchLocations = async () => {
    try {
        const response = await axiosInstance.get('/api/locations');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch locations');
    }
};
