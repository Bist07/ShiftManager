import { getShiftsByMonthAndYearLogic, updateShiftLogic, deleteShiftLogic, createShiftLogic, createShiftsForDatesBulkLogic, getShiftsLogic } from '../logic/shiftLogic.js';
import { validateFields } from '../utils/validateFields.js';

// Middleware for validating request fields
const validateRequest = (fields, res) => {
    const validationError = validateFields(fields, res);
    if (validationError) return validationError;
};

// Controller to handle getting shifts
export const getShifts = async (req, res) => {
    const { month, year } = req.query;

    if (validateRequest({ month, year }, res)) return;

    try {
        const shifts = await getShiftsByMonthAndYearLogic(month, year);

        if (shifts.length === 0) {
            return res.status(404).send('No shifts found for the selected month and year');
        }

        res.status(200).json(shifts);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching shifts');
    }
};

// Controller to handle getting shifts
export const getShiftsForValidation = async (e_id, dateIds) => {
    if (validateRequest({ e_id, dateIds })) return null; // Return null or empty array if validation fails

    try {
        const shifts = await getShiftsLogic(e_id, dateIds);

        if (shifts.length === 0) {
            return null; // Return null if no shifts are found
        }

        return shifts; // Return shifts data
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching shifts'); // Throw error for route handler to catch
    }
};


// Controller to update a shift
export const updateShift = async (req, res) => {
    const { shift_id, start_time, end_time, location_id, role_id } = req.body;

    if (validateRequest({ shift_id, start_time, end_time, location_id, role_id }, res)) return;

    try {
        const result = await updateShiftLogic(start_time, end_time, location_id, role_id, shift_id);

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

// Controller to create a shift
export const createShift = async (req, res) => {
    const { date, repeat, e_id, role_id, location_id, start_time, end_time } = req.body;

    if (validateRequest({ date, e_id, role_id, location_id, start_time, end_time }, res)) return;

    try {
        const result = await createShiftLogic(date, repeat, e_id, role_id, location_id, start_time, end_time);

        if (result.success) {
            return res.status(200).json({
                message: 'Shift created successfully',
                shift_id: result.shift_id.toString(),
            });
        } else {
            return res.status(500).send('An error occurred while creating the shift');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while creating the shift');
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


export const createShiftsForDatesBulk = async (req, res) => {
    const { locationId, role_id, startTime, endTime, dateIds } = req.body;
    try {

        // Validate inputs
        if (!locationId || !startTime || !endTime || !Array.isArray(dateIds) || dateIds.length === 0) {
            throw new Error('Missing required parameters.');
        }

        // Call the createShiftsForDatesBulk function from the model
        const shiftIds = await createShiftsForDatesBulkLogic(locationId, role_id, startTime, endTime, dateIds);

        if (shiftIds.length === 0) {
            throw new Error('No shifts were created.');
        } else {
            return shiftIds;
        }
    } catch (error) {
        console.error('Error in createShifts controller:', error);
        throw new Error('Failed to create shifts in bulk.');
    }
};
