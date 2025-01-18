// src/api/preferenceApi.js
import axiosInstance from './axiosInstance';

export const fetchPreference = async () => {
    try {
        const response = await axiosInstance.get('/api/preference');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch preference');
    }
};
