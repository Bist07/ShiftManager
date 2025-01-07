import { createShiftsForDatesBulk, deleteShift } from '../controllers/shiftController.js';
import { assignShiftsToEmployeesBulk, deleteAssignment } from '../controllers/assignmentController.js';
import { getDatesForShift } from '../controllers/dateController.js';
import { query } from '../config/db.js'; // Import the query function

// Function to create shifts in bulk and assign them to employees with a transaction
export const createAndAssignShiftsInBulk = async (day, repeat, e_id, role_id, location_id, start_time, end_time) => {
    const conn = await query('BEGIN'); // Start the transaction
    try {
        // Step 1: Get date IDs based on the given parameters (daysOfWeek, startDate, endDate, and frequency)
        const dateIds = await getDatesForShift(repeat);

        if (dateIds.length === 0) {
            throw new Error('No valid dates found for the given parameters.');
        }

        // Step 2: Create shifts in bulk for the fetched date IDs
        const shiftIds = await createShiftsForDatesBulk(location_id, role_id, start_time, end_time, dateIds);

        if (shiftIds.length === 0) {
            throw new Error('No valid shifts found for the given parameters.');
        }

        // Step 3: Assign the newly created shifts to employees
        await assignShiftsToEmployeesBulk(e_id, shiftIds);

        // Commit the transaction
        await query('COMMIT', [], conn);

        console.log('Shifts created and assigned successfully.');
        return { message: 'Shifts created and assigned successfully.' };
    } catch (error) {
        // Rollback the transaction in case of an error
        await query('ROLLBACK', [], conn);
        console.error('Error creating and assigning shifts in bulk:', error);
        throw new Error('Failed to create and assign shifts in bulk.');
    }
};

// Function to delete shifts and assingments 
export const deleteShiftsAndAssignments = async (e_id, shift_id) => {
    const conn = await query('BEGIN'); // Start the transaction
    try {
        // Step 1: Delete assignments for the given employee
        await deleteAssignment(e_id, shift_id);

        // Step 2: Delete the shift
        await deleteShift(shift_id);

        // Commit the transaction
        await query('COMMIT', [], conn);

        console.log('Shifts and assignments deleted successfully.');
        return { message: 'Shifts and assignments deleted successfully.' };
    } catch (error) {
        // Rollback the transaction in case of an error
        await query('ROLLBACK', [], conn);
        console.error('Error deleting shifts and assignments:', error);
        throw new Error('Failed to delete shifts and assignments.');
    }
};