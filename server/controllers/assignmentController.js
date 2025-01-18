// controllers/assignmentController.js
import { assignShiftsToEmployeesLogic, deleteAssignmentLogic } from '../logic/assignmentLogic.js';

export const deleteAssignment = async (req, res) => {
    try {
        const { e_id, shift_id } = req.query; // Assuming the IDs are passed as URL parameters
        if (!e_id || !shift_id) {
            return res.status(400).json({ error: 'Missing required parameters.' });
        }

        // Call the model function to delete the assignment from the database
        const result = await deleteAssignmentLogic(e_id, shift_id);

        // If the assignment was deleted successfully
        if (result.success) {
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

export const assignShiftsToEmployees = async () => {
    const { e_id, shift_id } = req.body;
    try {
        // Validate inputs
        if (!e_id || !Array.isArray(shift_id)) {
            throw new Error('No valid shifts found for the given parameters.');
        }

        const result = await assignShiftsToEmployeesLogic(e_id, shift_id);

    } catch (error) {
        console.error('Error in assignShifts controller:', error);
        throw new Error('Failed to assign shifts in bulk.');

    }
};
