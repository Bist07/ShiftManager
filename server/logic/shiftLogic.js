// logic/shiftLogic.js
import { updateShiftModel, deleteShiftModel, createShiftsModel, getShiftsModel, getUnassignedShiftsModel } from '../models/shiftModel.js';

// Logic to get shifts by year
export const getShiftsLogic = async () => {
    try {
        const shifts = await getShiftsModel();
        return shifts;
    } catch (error) {
        throw new Error('Failed to fetch shifts');
    }
};

// Logic to update a shift
export const updateShiftLogic = async (start_time, end_time, location_id, role_id, shift_id) => {
    try {
        const result = await updateShiftModel(start_time, end_time, location_id, role_id, shift_id);
        return result;
    } catch (error) {
        throw new Error('Failed to update shift');
    }
};

// Logic to delete a shift
export const deleteShiftLogic = async (shift_id) => {
    try {
        const result = await deleteShiftModel(shift_id);
        return result;
    } catch (error) {
        throw new Error('Failed to delete shift');
    }
};


// Logic to create shifts for dates in bulk
export const createShiftsLogic = async (locationId, role_id, startTime, endTime, dates) => {
    try {
        const shiftIds = await createShiftsModel(locationId, role_id, startTime, endTime, dates);
        return shiftIds;
    } catch (error) {
        throw new Error('Failed to create shifts in bulk');
    }
};


// Logic to get unassigned shifts
export const getUnassignedShiftsLogic = async () => {
    try {
        const shifts = await getUnassignedShiftsModel();
        return shifts;
    } catch (error) {
        throw new Error('Failed to fetch shifts');
    }
};

