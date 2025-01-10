// logic/shiftLogic.js
import { getShiftsByMonthAndYearModel, updateShiftModel, deleteShiftModel, createShiftModel, createShiftsForDatesBulkModel, getShiftsModel, getUnassignedShiftsModel } from '../models/shiftModel.js';

// Logic to get shifts by month and year
export const getShiftsByMonthAndYearLogic = async (month, year) => {
    try {
        const shifts = await getShiftsByMonthAndYearModel(month, year);
        return shifts;
    } catch (error) {
        throw new Error('Failed to fetch shifts by month and year');
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

// Logic to create a shift
export const createShiftLogic = async (date, repeat, e_id, role_id, location_id, start_time, end_time) => {
    try {
        const result = await createShiftModel(date, repeat, e_id, role_id, location_id, start_time, end_time);
        return result;
    } catch (error) {
        throw new Error('Failed to create shift');
    }
};

// Logic to create shifts for dates in bulk
export const createShiftsForDatesBulkLogic = async (locationId, role_id, startTime, endTime, dateIds) => {
    try {
        const shiftIds = await createShiftsForDatesBulkModel(locationId, role_id, startTime, endTime, dateIds);
        return shiftIds;
    } catch (error) {
        throw new Error('Failed to create shifts in bulk');
    }
};

// Logic to get shifts
export const getShiftsLogic = async (e_id, dateIds) => {
    try {
        const shifts = await getShiftsModel(e_id, dateIds);
        return shifts;
    } catch (error) {
        throw new Error('Failed to fetch shifts');
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

