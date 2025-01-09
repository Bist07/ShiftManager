// src/api/dateApi.js
import axiosInstance from './axiosInstance';

export const fetchDateIds = async (repeat) => {
    try {
        const response = await axiosInstance.get('/api/dates/dateIds', { params: { repeat } });
        return response.data;

    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch dates');
    }
};