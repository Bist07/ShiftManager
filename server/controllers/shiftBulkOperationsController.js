// controllers/shiftBulkOperationsController.js

import { deleteAssignmentLogic, assignShiftsToEmployeesLogic } from '../logic/assignmentLogic.js';
import { createShiftsLogic, deleteShiftLogic } from '../logic/shiftLogic.js';
import { createDateLogic } from '../logic/dateLogic.js';
import { query } from '../config/db.js';

// Function to create shifts in bulk and assign them to employees with a transaction
export const createAndAssignShiftsInBulk = async (req, res) => {
    const { dates, e_id, role_id, location_id, start_time, end_time } = req.body;
    const conn = await query('BEGIN'); // Start the transaction
    try {
        // Step 1: Create dates if they dont exist
        await createDateLogic(dates)

        if (!e_id) {
            const shiftIds = await createShiftsLogic(location_id, role_id, start_time, end_time, dates);
            if (shiftIds.length === 0) {
                return res.status(404).json({ message: 'No unassigned shifts created.' });
            }
        }

        // Step 2: Iterate over each employee and create a new shift for each
        for (const e of e_id) {
            const shiftIds = await createShiftsLogic(location_id, role_id, start_time, end_time, dates); // Use the core logic function

            if (shiftIds.length === 0) {
                return res.status(404).json({ message: 'No shifts created.' });
            }

            // Step 3: Assign the newly created shifts to the current employee
            await assignShiftsToEmployeesLogic(e, shiftIds); // Use the core logic function
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
