// models/availabilityModel.js
import { query } from '../config/db.js';

// Function to get shifts by month and year
export const getAvailabilityInDB = async () => {
    const sqlQuery = `
    SELECT 
        *
    FROM availability
`;

    return await query(sqlQuery);
};

// Function to update the availibility in the database
export const updateAvailabilityInDB = async (e_id, day_of_week, start_time, end_time) => {
    const sqlQuery = `
        UPDATE availability
        SET start_time = ?, end_time = ?
        WHERE e_id = ? AND day_of_week = ?;
    `;
    const params = [start_time, end_time, e_id, day_of_week];

    return await query(sqlQuery, params);
};

// Function to update the availibility in the database
export const createAvailabilityInDB = async (e_id, day_of_week, start_time, end_time) => {
    const sqlQuery = `
        INSERT INTO avaiibility (e_id, day_of_week, start_time, end_time)
        VALUES (?, ?, ?, ?);`;

    const params = [e_id, day_of_week, start_time, end_time];

    return await query(sqlQuery, params);

};
