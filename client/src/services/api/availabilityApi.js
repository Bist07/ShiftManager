// src/api/availabilityApi.js
import axiosInstance from './axiosInstance';

export const fetchAvailability = async () => {
    try {
        const response = await axiosInstance.get('/api/availability');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch availability');
    }
};


export const updateAvailability = async (e_id, day_of_week, start_time, end_time) => {
    try {
        // Use a PUT request for updating the availability
        const response = await axiosInstance.put('/api/availability/update', {
            e_id,
            day_of_week,
            start_time,
            end_time
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update availability');
    }
};


export const createAvailability = async (e_id, day_of_week, start_time, end_time) => {
    try {
        // Use a POST request for updating the availability
        const response = await axiosInstance.post('/api/availability/create', {
            e_id,
            day_of_week,
            start_time,
            end_time
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create availability');
    }
};


