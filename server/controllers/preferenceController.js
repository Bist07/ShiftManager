// controllers/preferenceontroller.js
import { getPreferenceLogic } from '../logic/preferenceLogic.js';
import { validateFields } from '../utils/validateFields.js';

// Controller to handle getting preferences
export const getPreference = async (req, res) => {

    try {
        const preferences = await getPreferenceLogic();

        // If no preferences found
        if (preferences.length === 0) {
            return res.status(404).send('No preferences found');
        }

        // Return the preference data as response
        res.status(200).json(preferences);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching preference');
    }
};