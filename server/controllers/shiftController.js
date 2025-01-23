import { updateShiftLogic, deleteShiftLogic, createShiftsLogic, getShiftsLogic, getUnassignedShiftsLogic } from '../logic/shiftLogic.js';
import { validateFields } from '../utils/validateFields.js';

// Middleware for validating request fields
const validateRequest = (fields, res) => {
    const validationError = validateFields(fields, res);
    if (validationError) return validationError;
};

// Controller to handle getting shifts
export const getShifts = async (req, res) => {

    try {
        const shifts = await getShiftsLogic();

        if (shifts.length === 0) {
            return res.status(404).send('No shifts found');
        }

        res.status(200).json(shifts);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching shifts');
    }
};


// Controller to update a shift
export const updateShift = async (req, res) => {
    const { shift_id, start_time, end_time, location_id, position_id } = req.body;

    if (validateRequest({ shift_id, start_time, end_time, location_id, position_id }, res)) return;

    try {
        const result = await updateShiftLogic(start_time, end_time, location_id, position_id, shift_id);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Shift updated successfully' });
        } else {
            return res.status(404).send('Shift not found or no changes made');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating the shift');
    }
};


// Controller to delete a shift
export const deleteShift = async (shift_id) => {

    if (!shift_id) {
        throw new Error('Missing required parameters.');
    }

    try {
        const result = await deleteShiftLogic(shift_id);

        if (result.affectedRows > 0) {
            return result;
        } else {
            throw new Error('No shifts were deleted.');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to delete shifts.');
    }
}


export const createShifts = async (req, res) => {
    const { locationId, position_id, startTime, endTime, dateIds } = req.body;
    try {

        // Validate inputs
        if (!locationId || !startTime || !endTime || !Array.isArray(dateIds) || dateIds.length === 0) {
            throw new Error('Missing required parameters.');
        }

        // Call the createShiftsForDatesBulk function from the model
        const shiftIds = await createShiftsLogic(locationId, position_id, startTime, endTime, dateIds);
        if (shiftIds.length === 0) {
            return res.status(404).send('No shifts found for the selected month and year');
        }

        res.status(200).json(shiftIds);

    } catch (error) {
        console.error('Error in createShifts controller:', error);
        throw new Error('Failed to create shifts in bulk.');
    }
};

// Controller to handle getting shifts
export const getUnassignedShifts = async (req, res) => {

    try {
        const shifts = await getUnassignedShiftsLogic();

        if (shifts.length === 0) {
            return res.status(404).send('No unassinged shifts found');
        }

        res.status(200).json(shifts);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching shifts'); // Throw error for route handler to catch
    }
};