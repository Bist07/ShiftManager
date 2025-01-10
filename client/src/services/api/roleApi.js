// src/api/roleApi.js
import axiosInstance from './axiosInstance';

export const fetchRoles = async () => {
    try {
        const response = await axiosInstance.get('/api/roles');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch roles');
    }
};
