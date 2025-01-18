import { deleteAssignmentModel, assignShiftsToEmployeesModel } from '../models/assignmentModel.js';

export const assignShiftsToEmployeesLogic = async (e_id, shift_id) => {
    try {
        // Call the model function to assign shifts in bulk to employees
        const result = await assignShiftsToEmployeesModel(e_id, shift_id);
        if (result.affectedRows > 0) {
            console.log(result)
            return { success: true, message: 'Shifts assigned to employees in bulk successfully.' };
        } else {
            return { success: false, message: 'Failed to assign shifts to employees.' };
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to assign shifts in bulk.');
    }
};

export const deleteAssignmentLogic = async (employeeId, shiftId) => {
    try {
        // Call the model function to delete the assignment from the database
        const result = await deleteAssignmentModel(employeeId, shiftId);
        if (result.affectedRows > 0) {
            return { success: true };
        } else {
            return { success: false, message: 'Assignment not found' };
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting assignment');
    }
};
