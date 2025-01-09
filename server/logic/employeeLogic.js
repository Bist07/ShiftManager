import { getEmployeeModel, updateEmployeeModel, createEmployeeModel, deleteEmployeeModel } from '../models/employeeModel.js';

export const getEmployeeLogic = async () => {
    try {
        // Call the model function to get employees
        const result = await getEmployeeModel();
        return result;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw new Error('Failed to retrieve employees');
    }
};

export const updateEmployeeLogic = async (e_id, name, email) => {
    try {
        // Call the model function to update an employee
        const result = await updateEmployeeModel(e_id, name, email);
        return result;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw new Error('Failed to update employee');
    }
};

export const createEmployeeLogic = async (name, email) => {
    try {
        // Call the model function to create an employee
        const result = await createEmployeeModel(name, email);
        return result;
    } catch (error) {
        console.error('Error creating employee:', error);
        throw new Error('Failed to create employee');
    }
};

export const deleteEmployeeLogic = async (e_id) => {
    try {
        // Call the model function to delete an employee
        const result = await deleteEmployeeModel(e_id);
        return result;
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw new Error('Failed to delete employee');
    }
};
