// src/api/shiftApi.js
import axiosInstance from './axiosInstance';

export const deleteAssignment = async (e_id, shift_id) => {
    try {
        // Use a DELETE request to remove the assignment
        const response = await axiosInstance.delete(`/api/assignments/delete`, {
            params: { e_id, shift_id } // Pass e_id as a query parameter
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete assignment');
    }
};
