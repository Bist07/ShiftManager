// models/positionModel.js
import { query } from '../config/db.js';

// Function to get shifts by month and year
export const getPositionsInDB = async () => {
    const sqlQuery = `
        SELECT *
        FROM roles
    `;
    return await query(sqlQuery);
};
