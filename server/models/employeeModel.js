import { query } from '../config/db.js';

// Function to get all employees
export const getEmployeeInDB = async () => {
    const sqlQuery = `
        SELECT *
        FROM employee;
    `;
    try {
        return await query(sqlQuery);
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw new Error('Failed to fetch employees.');
    }
};

// Function to update employee details in the database
export const updateEmployeeInDB = async (first_name, last_name, email, e_id) => {
    const sqlQuery = `
        UPDATE employee
        SET first_name = ?, last_name = ?, email = ?
        WHERE e_id = ?;
    `;
    const params = [first_name, last_name, email, e_id];

    try {
        return await query(sqlQuery, params);
    } catch (error) {
        console.error('Error updating employee:', error);
        throw new Error('Failed to update employee.');
    }
};

// Function to create a new employee in the database
export const createEmployeeInDB = async (first_name, last_name, email) => {
    const sqlQuery = `
        INSERT INTO employee (first_name, last_name, email)
        VALUES (?, ?, ?);
    `;
    try {
        const createResult = await query(sqlQuery, [first_name, last_name, email]);

        // Get the generated employee ID
        const e_id = createResult.insertId;

        // Return a success response with the e_id
        return { success: true, e_id };
    } catch (error) {
        console.error('Error creating employee:', error);
        return { success: false, message: 'Failed to create employee.', error };
    }
};

// Function to delete an employee by ID
export const deleteEmployeeInDB = async (e_id) => {
    const sqlQuery = `
        DELETE FROM employee
        WHERE e_id = ?;
    `;
    const params = [e_id];

    try {
        return await query(sqlQuery, params);
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw new Error('Failed to delete employee.');
    }
};
