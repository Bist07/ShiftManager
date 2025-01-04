import axiosInstance from './axiosInstance';

export const fetchEmployee = async () => {
    try {
        const response = await axiosInstance.get('/api/employees');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch employee');
    }
};


export const updateEmployee = async (e_id, first_name, last_name, email) => {
    try {
        // Use a PUT request for updating the employee details
        const response = await axiosInstance.put('/api/employees/update', {
            e_id,
            first_name,
            last_name,
            email
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update employee');
    }
};


export const createEmployee = async (first_name, last_name, email) => {
    try {
        // Use a POST request for updating the shift
        const response = await axiosInstance.post('/api/employees/create', {
            first_name,
            last_name,
            email
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create employee');
    }
};

export const deleteEmployee = async (e_id) => {
    try {
        // Use a DELETE request for updating the shift
        const response = await axiosInstance.delete('/api/employees/delete', {
            e_id
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete employee');
    }
};

