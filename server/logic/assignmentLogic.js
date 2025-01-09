import { deleteAssignmentModel, assignShiftToEmployeeModel, assignShiftsToEmployeesBulkModel, deleteAssignmentsInBulkModel } from '../models/assignmentModel.js';

export const assignShiftToEmployeeLogic = async (employeeId, shiftId) => {
    try {
        // Call the model function to assign a single shift to an employee
        const result = await assignShiftToEmployeeModel(employeeId, shiftId);
        if (result.affectedRows > 0) {
            return { success: true };
        } else {
            return { success: false, message: 'Failed to assign shift', error: 'No changes made or shift not found' };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error assigning shift', error: error.message };
    }
};

export const assignShiftsToEmployeesBulkLogic = async (employeeIds, shiftIds) => {
    try {
        // Call the model function to assign shifts in bulk to employees
        const result = await assignShiftsToEmployeesBulkModel(employeeIds, shiftIds);
        if (result.affectedRows > 0) {
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

export const deleteAssignmentsInBulkLogic = async (employeeIds, shiftIds) => {
    try {
        // Call the model function to delete assignments in bulk
        const result = await deleteAssignmentsInBulkModel(employeeIds, shiftIds);
        if (result.affectedRows > 0) {
            return { success: true, message: 'Assignments deleted in bulk successfully.' };
        } else {
            return { success: false, message: 'Failed to delete assignments in bulk.' };
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to delete assignments in bulk');
    }
};
