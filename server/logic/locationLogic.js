import { getLocationsModel } from '../models/locationModel.js';

export const getLocationsLogic = async () => {
    try {
        // Call the model function to get locations
        const result = await getLocationsModel();
        return result;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw new Error('Failed to retrieve locations');
    }
};
