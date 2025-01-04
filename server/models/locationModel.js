// models/locationModel.js
import { query } from '../config/db.js';

// Function to get shifts by month and year
export const getLocationsInDB = async () => {
    const sqlQuery = `
        SELECT *
        FROM locations
    `;
    return await query(sqlQuery);
};
