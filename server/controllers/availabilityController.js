// controllers/availabilityController.js
import { validateFields } from '../utils/validateFields.js';
import { getAvailabilityLogic, updateAvailabilityLogic, createAvailabilityLogic } from '../logic/availabilityLogic.js'

export const getAvailability = async (req, res) => {
    try {
        const availability = await getAvailabilityLogic();

        if (availability.length === 0) {
            return res.status(404).send('No availability found');
        }

        res.status(200).json(availability);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching availability data.');
    }
};


export const updateAvailability = async (req, res) => {

    try {
        // Destructure the data from the request body
        const { e_id, day_of_week, start_time, end_time } = req.body;

        // Validate that required fields are provided
        const validationError = validateFields({ e_id, day_of_week, start_time, end_time }, res);
        if (validationError) return validationError;

        // Call the model function to update the availibility in the database
        const result = await updateAvailabilityLogic(e_id, day_of_week, start_time, end_time);

        // If the update is successful, send a response
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'availibility updated successfully' });
        } else {
            return res.status(404).send('availaibilty not found or no changes made');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating the availaibilty');
    }
};


export const createAvailability = async (req, res) => {

    try {
        // Destructure the data from the request body
        const { e_id, day_of_week, start_time, end_time } = req.body;

        const validationError = validateFields({ e_id, day_of_week, start_time, end_time }, res);
        if (validationError) return validationError;

        // Call the model function to create the shift in the database
        const result = await createAvailabilityLogic(e_id, day_of_week, start_time, end_time);

        // If the post is successful, send a response
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'availaibilty created successfully' });

        } else {
            return res.status(404).send('An error occurred while creating the availaibilty');

        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while creating the availaibilty');
    }
};
