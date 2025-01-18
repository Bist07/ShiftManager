// models/shiftModel.js
import { query } from '../config/db.js';

export const deleteAssignmentModel = async (e_id, shift_id) => {
    try {
        const sqlQuery = `
            DELETE FROM assignments
            WHERE employee_id = ? AND shift_id = ?
        `;
        const params = [e_id, shift_id];

        const result = await query(sqlQuery, params);

        // Check if any rows were affected
        if (result.affectedRows === 0) {
            throw new Error('No assignment found with the given employee ID');
        }

        return { message: 'Assignment deleted successfully', affectedRows: result.affectedRows };
    } catch (error) {
        console.error('Error deleting assignment:', error.message);
        throw error;
    }
};

export const assignShiftsToEmployeesModel = async (employeeIds, shiftIds) => {
    try {
        // Construct the values for the insert: each employeeId with each shiftId
        const values = [];

        shiftIds.forEach(shiftId => {
            values.push(`(${employeeIds}, ${shiftId})`);  // Pair employeeId with shiftId
        });

        // Join all pairs with commas
        const sqlAssignShiftBulk = `
            INSERT INTO assignments (employee_id, shift_id)
            VALUES ${values.join(", ")}
        `;

        // Execute the query
        const result = await query(sqlAssignShiftBulk);
        console.log(`${result.affectedRows} assignments created successfully.`);
        return result;
    } catch (error) {
        console.error("Error bulk assigning shifts:", error);
        throw new Error('Failed to assign shifts in bulk.');
    }
};
