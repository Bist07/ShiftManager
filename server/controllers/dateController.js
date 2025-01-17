// controllers/dateController.js
import { getDatesForShiftLogic, updateDateLogic, getDatesByMonthAndYearLogic } from '../logic/dateLogic.js';
import { validateFields } from '../utils/validateFields.js';

// Controller to handle getting shifts
export const getDates = async (req, res) => {
    const { month, year } = req.query;

    const validationError = validateFields({ month, year }, res);
    if (validationError) return validationError;

    try {
        const shifts = await getDatesByMonthAndYearLogic(month, year);

        // If no shifts found
        if (shifts.length === 0) {
            return res.status(404).send('No shifts found for the selected month and year');
        }

        // Return the shifts data as response
        res.status(200).json(shifts);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching shifts');
    }
};

export const updateDate = async (req, res) => {

    try {
        // Destructure the data from the request body
        const { date_id } = req.body;

        const validationError = validateFields({ date_id }, res);
        if (validationError) return validationError;

        // Call the model function to update the shift in the database
        const result = await updateDateLogic(date_id);

        // If the update is successful, send a response
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'date updated successfully' });
        } else {
            return res.status(404).send('date not found or no changes made');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating the date');
    }
};

export const getDatesForShift = async (req, res) => {
    try {
        const { repeat } = req.query;
        const { days, startDate, endDate, frequency } = repeat;

        // Validate inputs
        if (!days || !startDate || !endDate || !frequency) {
            throw new Error('Missing required parameters.');
        }

        // Call the sqlgetDatesIDForShift function from the model
        const dateIds = await getDatesForShiftLogic(repeat);

        if (dateIds.length === 0) {
            return res.status(404).send('No dateIds found');
        }

        res.status(200).json(dateIds);

    } catch (error) {
        console.error('Error in getDatesForShift controller:', error);
        throw new Error('Failed to retrieve dates.');
    }
};
