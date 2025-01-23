
// logic/preferenceLogic.js
import { getPreferenceModel } from '../models/preferenceModel.js';

// Logic to get prefrence
export const getPreferenceLogic = async () => {
    try {
        const preference = await getPreferenceModel();

        // Return the preference fetched from the database
        return preference;
    } catch (error) {
        console.error('Error fetching preference in logic layer:', error);
        throw new Error('An error occurred while fetching preference');
    }
};
