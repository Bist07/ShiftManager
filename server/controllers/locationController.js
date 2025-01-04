// controllers/locationController.js
import { getLocationsInDB } from '../models/locationModel.js';
import { validateFields } from '../utils/validateFields.js';

// Controller to handle getting location
export const getLocation = async (req, res) => {

    try {
        const locations = await getLocationsInDB();

        // If no location found
        if (locations.length === 0) {
            return res.status(404).send('No locations found');
        }

        // Return the locations data as response
        res.status(200).json(locations);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching locations');
    }
};