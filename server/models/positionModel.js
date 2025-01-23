// models/positionModel.js
import { query } from '../config/db.js';

// Function to get shifts by month and year
export const getPositionsModel = async () => {
    const sqlQuery = `
        SELECT *
        FROM positions
    `;
    return await query(sqlQuery);
};
