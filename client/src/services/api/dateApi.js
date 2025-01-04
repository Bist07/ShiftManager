// src/api/dateApi.js
import axiosInstance from './axiosInstance';

export const fetchDates = async (month, year) => {
    try {
        const response = await axiosInstance.get('/api/dates', { params: { month, year } });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch dates');
    }
};
