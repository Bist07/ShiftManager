// controllers/assignmentController.js
import { assignShiftsToEmployeesBulkLogic, deleteAssignmentLogic, assignShiftToEmployeeLogic, deleteAssignmentsInBulkLogic } from '../logic/assignmentLogic.js';

export const deleteAssignment = async (req, res) => {
    try {
        const { e_id, shift_id } = req.query; // Assuming the IDs are passed as URL parameters
        if (!e_id || !shift_id) {
            return res.status(400).json({ error: 'Missing required parameters.' });
        }

        // Call the model function to delete the assignment from the database
        const result = await deleteAssignmentLogic(e_id, shift_id);

        // If the assignment was deleted successfully
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Assignment deleted successfully.' });
        } else {
            // If no assignment with the given e_id exists
            return res.status(404).json({ error: 'No assignments found.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

export const assignShiftsToEmployeesBulk = async () => {
    const { employeeIds, shiftIds } = req.body;
    try {
        // Validate inputs
        if (!employeeIds || !Array.isArray(shiftIds)) {
            throw new Error('No valid shifts found for the given parameters.');
        }

        const result = await assignShiftsToEmployeesBulkLogic(employeeIds, shiftIds);

    } catch (error) {
        console.error('Error in assignShifts controller:', error);
        throw new Error('Failed to assign shifts in bulk.');

    }
};

export const assignShift = async (req, res) => {
    try {
        const { employeeId, shiftId } = req.body;
        // Validate inputs
        if (!employeeId || !shiftId) {
            return res.status(400).json({ error: 'employeeId and shiftId are required.' });
        }

        const result = await assignShiftToEmployeeLogic(employeeId, shiftId);
        if (result.success) {
            res.status(200).json({
                success: true,
                message: 'Shift assigned successfully.'
            });
        } else {
            res.status(500).json({
                success: false,
                message: result.message,
                error: result.error
            });
        }
    } catch (error) {
        console.error('Error in assignShift controller:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to assign shift.',
            error: error.message
        });
    }
};

export const deleteAssignmentsInBulk = async (req, res) => {
    try {
        const { employeeIds, shiftIds } = req.body;
        // Validate inputs
        if (!Array.isArray(employeeIds) || !Array.isArray(shiftIds)) {
            return res.status(400).json({ error: 'Invalid input. employeeIds and shiftIds must be arrays.' });
        }

        const result = await deleteAssignmentsInBulkLogic(employeeIds, shiftIds);
        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        console.error('Error in deleteAssignments controller:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete assignments.',
            error: error.message
        });
    }
};
