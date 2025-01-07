// src/api/shiftApi.js
import axiosInstance from './axiosInstance';


export const fetchShifts = async (month, year) => {
    try {
        const response = await axiosInstance.get('/api/shifts', { params: { month, year } });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch shifts');
    }
};


export const updateShift = async (shift_id, start_time, end_time, location_id, role_id) => {
    try {
        // Use a PUT request for updating the shift
        const response = await axiosInstance.put('/api/shifts/update', {
            shift_id,
            start_time,
            end_time,
            location_id,
            role_id
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update shift');
    }
};


export const createShift = async (date, repeat, e_id, role_id, location_id, start_time, end_time) => {
    try {
        // Use a POST request for updating the shift
        const response = await axiosInstance.post('/api/shifts/create', {
            date,
            repeat,
            e_id,
            role_id,
            location_id,
            start_time,
            end_time
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create shift');
    }
};

export const deleteShift = async (shift_id) => {
    try {
        // Send shift_id as a query parameter in the DELETE request
        const response = await axiosInstance.delete('/api/shifts/delete', {
            params: { shift_id }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete shift');
    }
};
