// models/shiftModel.js
import { query } from '../config/db.js';

// Function to get shifts by month and year
export const getDatesByMonthAndYearModel = async (month, year) => {
    const sqlQuery = `
    SELECT 
        full_date AS date,  
        date_id,
        day_of_week
    FROM dim_Date
    WHERE YEAR(full_date) = ? AND MONTH(full_date) = ? 
`;

    const params = [year, month];
    return await query(sqlQuery, params);
};


// Function to update the shift in the database
export const updateDateModel = async (date_id, is_Holiday) => {
    const sqlQuery = `
        UPDATE dim_date
        SET is_Holiday = ?
        WHERE date_id = ?
    `;
    const params = [is_Holiday, date_id];

    return await query(sqlQuery, params);
};


export const getDatesIdForShiftModel = async (days, startDate, endDate, frequency) => {
    if (!days || !startDate || !endDate || !frequency) {
        throw new Error("Missing required parameters");
    }
    console.log("Getting date IDs for shift with parameters:", { days, startDate, endDate, frequency });
    const isSingleDay = startDate === endDate;
    const queryText = isSingleDay
        ? `
            SELECT date_id
            FROM dim_Date
            WHERE full_date = ?;
        `
        : `
            SELECT date_id
            FROM dim_Date
            WHERE day_of_week IN (?)
            AND full_date >= ?
            AND full_date <= ?
            AND MOD(DATEDIFF(full_date, ?), ?) = 0;
        `;
    const params = isSingleDay
        ? [startDate]
        : [days, startDate, endDate, startDate, frequency];


    try {
        const results = await query(queryText, params);
        const dateIds = results.map(row => row.date_id);
        console.log("Date IDs for shift:", results);
        return dateIds;
    } catch (err) {
        console.error("Error executing query:", err);
        throw err;
    }
};
