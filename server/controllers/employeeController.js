// controllers/employeeController.js
import { validateFields } from '../utils/validateFields.js';
import { getEmployeeLogic, updateEmployeeLogic, createEmployeeLogic, deleteEmployeeLogic } from '../logic/employeeLogic.js'

// Controller to get employees
export const getEmployee = async (req, res) => {  // Accept both req and res
    try {
        const employees = await getEmployeeLogic();

        if (employees.length === 0) {
            return res.status(404).json({ message: 'No employees found' });
        }

        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'An error occurred while fetching employees' });
    }
};

// Controller to update an employee
export const updateEmployee = async (req, res) => {
    const { e_id, name, email } = req.body;

    // Validate required fields
    const validationError = validateFields({ e_id, name, email }, res);
    if (validationError) return validationError;

    try {
        const result = await updateEmployeeLogic(e_id, name, email);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Employee updated successfully' });
        } else {
            return res.status(404).json({ message: 'Employee not found or no changes made' });
        }
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'An error occurred while updating the employee' });
    }
};

// Controller to create an employee
export const createEmployee = async (req, res) => {
    const { name, email } = req.body;

    // Validate required fields
    const validationError = validateFields({ name, email }, res);
    if (validationError) return validationError;

    try {
        const result = await createEmployeeLogic(name, email);

        if (result.success) {
            return res.status(201).json({
                message: 'Employee created successfully',
                e_id: result.e_id.toString(),
            });
        } else {
            return res.status(500).json({ message: 'An error occurred while creating the employee' });
        }
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ message: 'An error occurred while creating the employee' });
    }
};

// Controller to delete an employee
export const deleteEmployee = async (req, res) => {
    const { e_id } = req.body;

    if (!e_id) {
        return res.status(400).json({ message: 'Employee ID is required' });
    }

    try {
        const result = await deleteEmployeeLogic(e_id);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Employee deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Employee not found or already deleted' });
        }
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'An error occurred while deleting the employee' });
    }
};
