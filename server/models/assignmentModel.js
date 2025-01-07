// models/shiftModel.js
import { query } from '../config/db.js';

export const deleteAssignmentInDB = async (e_id, shift_id) => {
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

const sqlAssignShift = `
INSERT INTO assignments (employee_id, shift_id)
VALUES ?
`;


export const assignShiftsToEmployeesBulkInDB = async (employeeIds, shiftIds) => {
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


// Function to assign a shift to an employee
export const assignShiftToEmployeeInDB = async (e_id, shift_id) => {

    try {
        await query(sqlAssignShift, [e_id, shift_id]);
        return { success: true };
    } catch (error) {
        console.error('Error assigning shift:', error);
        return { success: false, message: 'Failed to assign shift.', error };
    }
};


// You can also add other utility bulk operations if needed, like deleting assignments in bulk
export const deleteAssignmentsInBulkInDB = async (employeeIds, shiftIds) => {
    try {
        for (let e_id of employeeIds) {
            for (let shift_id of shiftIds) {
                await deleteAssignmentInDB(e_id, shift_id);  // Reuse the delete function
            }
        }
        console.log('Assignments deleted successfully.');
        return { message: 'Assignments deleted successfully.' };
    } catch (error) {
        console.error('Error deleting assignments in bulk:', error);
        throw new Error('Failed to delete assignments in bulk.');
    }
};

