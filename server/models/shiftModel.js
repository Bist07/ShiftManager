import { query } from '../config/db.js';

// Function to get shifts by month and year
export const getShiftsInDB = async () => {
    const sqlQuery = `
        SELECT *
        FROM shifts
    `;
    const x = await query(sqlQuery);
    return x;
};

// Function to get shifts by month and year
export const getShiftsByMonthAndYear = async (month, year) => {
    const sqlQuery = `
        SELECT 
            CONCAT(e.first_name, ' ', e.last_name) AS name,
            e.e_id,  
            s.shift_id,
            d.full_date AS date,  
            d.day_of_week, 
            s.location_id,
            s.start_time, 
            s.end_time ,
            s.role_id,
            r.role_name
        FROM employee e
        LEFT JOIN assignments a ON a.employee_id = e.e_id
        LEFT JOIN shifts s ON a.shift_id = s.shift_id
        LEFT JOIN dim_Date d ON s.date_id = d.date_id
        LEFT JOIN roles r ON s.role_id = r.role_id
        WHERE YEAR(d.full_date) = ? AND MONTH(d.full_date) = ? 
            OR (s.shift_id IS NULL) -- Include employees without shifts
        ORDER BY e.e_id, d.full_date;
    `;

    try {
        const params = [year, month];
        return await query(sqlQuery, params);
    } catch (error) {
        console.error('Error fetching shifts:', error);
        throw new Error('Failed to fetch shifts.');
    }
};

// Function to update a shift in the database
export const updateShiftInDB = async (start_time, end_time, location_id, shift_id) => {
    const sqlQuery = `
        UPDATE shifts
        SET start_time = ?, end_time = ?, location_id = ?
        WHERE shift_id = ?;
    `;

    try {
        const params = [start_time, end_time, location_id, shift_id];
        return await query(sqlQuery, params);
    } catch (error) {
        console.error('Error updating shift:', error);
        throw new Error('Failed to update shift.');
    }
};

export const createShiftInDB = async (date, location_id, start_time, end_time) => {
    const sqlCreateShift = `
        INSERT INTO shifts (location_id, start_time, end_time, date_id)
        VALUES (?, ?, ?, ?)
    `;

    try {
        const result = await query(sqlCreateShift, [location_id, start_time, end_time, date]);
        const shift_ids = result?.insertId.map(row => row.shift_id);
        return shift_ids;
    } catch (error) {
        console.error('Error creating shift:', error);
        return { success: false, message: 'Failed to create shift.', error };
    }
};

// Function to delete a shift in the database
export const deleteShiftInDB = async (shift_id) => {
    const sqlQuery = `
        DELETE FROM shifts
        WHERE shift_id = ?;
    `;

    try {
        const params = [shift_id];
        return await query(sqlQuery, params);
    } catch (error) {
        console.error('Error deleting shift:', error);
        throw new Error('Failed to delete shift.');
    }
};

export const createShiftsForDatesBulkInDB = async (locationId, startTime, endTime, dateIds) => {
    try {
        // Construct the values for the insert
        const values = dateIds.map(dateId =>
            `(${locationId}, '${startTime}', '${endTime}', ${dateId})`
        ).join(", ");  // Join all values with a comma

        const sqlCreateShiftBulk = `
            INSERT INTO shifts (location_id, start_time, end_time, date_id)
            VALUES ${values}
        `;

        // Execute the query
        const result = await query(sqlCreateShiftBulk);
        const shift_ids = [];

        for (let i = 0; i < result.affectedRows; i++) {
            shift_ids.push(Number(result.insertId) + i);
        }

        return shift_ids;
    } catch (error) {
        console.error("Error bulk creating shifts:", error);
        throw new Error('Failed to create shifts in bulk.');
    }
};