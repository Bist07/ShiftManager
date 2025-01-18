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


export const insertDateModel = async (fullDates, dayOfWeek, isHoliday, isWeekend) => {
    const dateIds = [];

    // Loop through each date in the array
    for (const date of fullDates) {


        // Query to check if the date already exists
        const checkQuery = `
            SELECT date_id
            FROM dim_Date
            WHERE full_date = ?;
        `;

        // Check if the date exists
        const existingDates = await query(checkQuery, [date]);

        if (existingDates.length > 0) {
            // If the date exists, add the existing date_id to the list
            const existingDateIds = existingDates.map(row => row.date_id);
            dateIds.push(...existingDateIds);
            console.log(`Date already exists: ${date}. Date IDs for shift:`, existingDateIds);
        } else {
            // Insert the new date if it does not exist
            const insertQuery = `
                INSERT INTO dim_Date (full_date, day_of_week, is_Holiday, is_Weekend)
                VALUES (?, ?, ?, ?);
            `;
            dayOfWeek = new Date(date).getDay();
            const result = await query(insertQuery, [date, dayOfWeek, isHoliday, isWeekend]);

            // Add the new date_id to the list
            dateIds.push(result.insertId);
            console.log(`New date created: ${date}. Date ID:`, result.insertId);
        }
    }

    return dateIds;
};
