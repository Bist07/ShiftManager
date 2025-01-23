// src/api/shiftApi.js
import axiosInstance from './axiosInstance';

export const createBulkShift = async (dates, e_id, location_id, position_id, start_time, end_time) => {
    try {
        // Use a POST request for updating the shift
        const response = await axiosInstance.post('/api/shiftBulkOperations/create', {
            dates,
            e_id,
            position_id,
            location_id,
            start_time,
            end_time,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create shift');
    }
};

export const deleteShiftsAndAssignments = async (e_id, shift_id) => {
    try {
        // Use a DELETE request for deleting the shift
        const response = await axiosInstance.delete('/api/shiftBulkOperations/delete', {
            data: {
                e_id,
                shift_id,
            },

        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete shift');
    }
};

