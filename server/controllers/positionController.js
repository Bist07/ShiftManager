// controllers/positiontController.js
import { getPositionsInDB } from '../models/positionModel.js';
import { validateFields } from '../utils/validateFields.js';

// Controller to handle getting positions
export const getPosition = async (req, res) => {

    try {
        const positions = await getPositionsInDB();

        // If no positions found
        if (positions.length === 0) {
            return res.status(404).send('No positions found');
        }

        // Return the positions data as response
        res.status(200).json(positions);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching positions');
    }
};