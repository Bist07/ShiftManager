// logic/positionLogic.js
import { getPositionsModel } from '../models/positionModel.js';

// Logic to get positions
export const getPositionsLogic = async () => {
    try {
        const positions = await getPositionsModel();

        // Return the positions fetched from the database
        return positions;
    } catch (error) {
        console.error('Error fetching positions in logic layer:', error);
        throw new Error('An error occurred while fetching positions');
    }
};
