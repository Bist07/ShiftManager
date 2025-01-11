// models/preferenceModel.js
import { query } from '../config/db.js';

// Function to get shifts by month and year
export const getPreferenceModel = async () => {
    const sqlQuery = `
        SELECT *
        FROM preference
    `;
    return await query(sqlQuery);
};
