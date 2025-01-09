// controllers/shiftAssignmentController.js

import { deleteAssignmentLogic, assignShiftsToEmployeesBulkLogic } from '../logic/assignmentLogic.js';
import { createShiftsForDatesBulkLogic, deleteShiftLogic } from '../logic/shiftLogic.js';
import { getDatesForShiftLogic } from '../logic/dateLogic.js';
import { query } from '../config/db.js'; // Import the query function

// Function to create shifts in bulk and assign them to employees with a transaction
export const createAndAssignShiftsInBulk = async (req, res) => {
    const { day, repeat, e_id, role_id, location_id, start_time, end_time } = req.body;
    const conn = await query('BEGIN'); // Start the transaction
    try {
        // Step 1: Get date IDs based on the given parameters
        const dateIds = await getDatesForShiftLogic(repeat); // Use the core logic function
        if (dateIds.length === 0) {
            return res.status(404).json({ message: 'No valid dates found for the given parameters.' });
        }

        // Step 2: Iterate over each employee and create a new shift for each
        for (const e of e_id) {
            const shiftIds = await createShiftsForDatesBulkLogic(location_id, role_id, start_time, end_time, dateIds); // Use the core logic function

            if (shiftIds.length === 0) {
                return res.status(404).json({ message: 'No valid shifts found for the given parameters.' });
            }

            // Step 3: Assign the newly created shifts to the current employee
            await assignShiftsToEmployeesBulkLogic(e, shiftIds); // Use the core logic function
        }

        // Commit the transaction
        await query('COMMIT', [], conn);

        console.log('Shifts created and assigned successfully.');
        return res.status(200).json({ message: 'Shifts created and assigned successfully.' });
    } catch (error) {
        // Rollback the transaction in case of an error
        await query('ROLLBACK', [], conn);
        console.error('Error creating and assigning shifts in bulk:', error);
        return res.status(500).json({ message: 'Failed to create and assign shifts in bulk.' });
    }
};


export const deleteShiftsAndAssignments = async (req, res) => {
    const { e_id, shift_id } = req.body;

    if (!e_id || !shift_id) {
        return res.status(400).json({ error: 'Missing required parameters: e_id and shift_id.' });
    }

    const conn = await query('BEGIN'); // Start the transaction
    try {
        // Step 1: Delete assignments for the given employee
        await deleteAssignmentLogic(e_id, shift_id, conn);

        // Step 2: Delete the shift
        await deleteShiftLogic(shift_id, conn);

        // Commit the transaction
        await query('COMMIT', [], conn);

        console.log('Shifts and assignments deleted successfully.');
        return res.status(200).json({ message: 'Shifts and assignments deleted successfully.' });
    } catch (error) {
        // Rollback the transaction in case of an error
        await query('ROLLBACK', [], conn);
        console.error('Error deleting shifts and assignments:', error);
        return res.status(500).json({ error: 'Failed to delete shifts and assignments.', message: error.message });
    }
};
