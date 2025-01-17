// models/shiftModel.js
import { query } from '../config/db.js';
import dayjs from 'dayjs';

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

export const getDatesIdForShiftModel = async (dates) => {
    if (!Array.isArray(dates) || dates.length === 0) {
        throw new Error("Missing required parameter: dates must be a non-empty array");
    }

    console.log("Getting date IDs for shift with parameters:", { dates });

    // Dynamically generate placeholders for the IN clause
    const placeholders = dates.map(() => '?').join(', ');

    const queryText = `
        SELECT date_id, full_date
        FROM dim_Date
        WHERE full_date IN (${placeholders});
    `;

    try {
        // Execute the query with the dates array
        const results = await query(queryText, dates);
        console.log(results)
        // Extract date_ids from the results
        const dateIds = results.map(row => row.date_id);

        // Find the dates that didn't get a date_id
        const missingDates = dates.filter(date => !results.some(row => (dayjs(row.full_date)).format('YYYY-MM-DD') === date));

        console.log("Date IDs for shift:", dateIds);
        console.log("Dates that did not return a date_id:", missingDates);

        return { dateIds, missingDates };
    } catch (err) {
        console.error("Error executing query:", err);
        throw err;
    }
};


export const insertDateModel = async (fullDate, dayOfWeek, isHoliday, isWeekend) => {
    const insertQuery = `
        INSERT INTO dim_Date (full_date, day_of_week, is_Holiday, is_Weekend)
        VALUES (?, ?, ?, ?);
    `;
    const result = await query(insertQuery, [fullDate, dayOfWeek, isHoliday, isWeekend]);
    const dateIds = result?.insertId.map(row => row.date_id);

    console.log("Date IDs for shift:", dateIds);
    return dateIds;
};
