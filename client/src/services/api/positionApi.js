// src/api/positionApi.js
import axiosInstance from './axiosInstance';

export const fetchPositions = async () => {
    try {
        const response = await axiosInstance.get('/api/positions');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch positions');
    }
};
