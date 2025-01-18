import { query } from '../config/db.js';


// Function to get all shifts 
export const getShiftsModel = async () => {
    const sqlQuery = `
        SELECT 
            CONCAT(e.first_name, ' ', e.last_name) AS name,
            e.e_id,  
            s.shift_id,
            s.full_date AS date,  
            s.location_id,
            s.start_time, 
            s.end_time ,
            s.role_id,
            r.role_name
        FROM employee e
        LEFT JOIN assignments a ON a.employee_id = e.e_id
        LEFT JOIN shifts s ON a.shift_id = s.shift_id
        LEFT JOIN roles r ON s.role_id = r.role_id
        ORDER BY e.e_id, s.full_date;
    `;

    try {

        return await query(sqlQuery);
    } catch (error) {
        console.error('Error fetching shifts:', error);
        throw new Error('Failed to fetch shifts.');
    }
};

// Function to update a shift in the database
export const updateShiftModel = async (start_time, end_time, location_id, role_id, shift_id) => {
    const sqlQuery = `
        UPDATE shifts
        SET start_time = ?, end_time = ?, location_id = ?, role_id = ?
        WHERE shift_id = ?;
    `;

    try {
        const params = [start_time, end_time, location_id, role_id, shift_id];
        return await query(sqlQuery, params);
    } catch (error) {
        console.error('Error updating shift:', error);
        throw new Error('Failed to update shift.');
    }
};

export const createShiftModel = async (date, location_id, role_id, start_time, end_time) => {
    const sqlCreateShift = `
        INSERT INTO shifts (location_id,role_id, start_time, end_time, date_id)
        VALUES (?,?, ?, ?, ?)
    `;

    try {
        const result = await query(sqlCreateShift, [location_id, role_id, start_time, end_time, date]);
        const shift_ids = result?.insertId.map(row => row.shift_id);
        return shift_ids;
    } catch (error) {
        console.error('Error creating shift:', error);
        return { success: false, message: 'Failed to create shift.', error };
    }
};

// Function to delete a shift in the database
export const deleteShiftModel = async (shift_id) => {
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

export const createShiftsForDatesBulkModel = async (locationId, role_id, startTime, endTime, dates) => {
    try {
        // Construct the values for the insert

        const values = dates.map(date =>
            `(${locationId},'${role_id}','${startTime}', '${endTime}', '${date}')`
        ).join(", ");  // Join all values with a comma

        const sqlCreateShiftBulk = `
            INSERT INTO shifts (location_id, role_id, start_time, end_time, full_date)
            VALUES ${values}
        `;

        // Execute the query
        const result = await query(sqlCreateShiftBulk);
        const shift_ids = [];

        for (let i = 0; i < result.affectedRows; i++) {
            const sqlUpdateDateId = `
            UPDATE shifts s
            INNER JOIN dim_Date d
                ON s.full_date = d.full_date
            SET s.date_id = d.date_id
            WHERE s.date_id IS NULL;
        `;
            await query(sqlUpdateDateId);

            shift_ids.push(Number(result.insertId) + i);
        }

        return shift_ids;
    } catch (error) {
        console.error("Error bulk creating shifts:", error);
        throw new Error('Failed to create shifts in bulk.');
    }
};

// Function to get shifts 
export const getUnassignedShiftsModel = async () => {

    const sqlQuery = `
        SELECT 
        s.shift_id, NULL AS e_id, s.start_time, s.end_time, d.full_date, s.date_id, s.location_id, s.role_id, r.role_name
        FROM shifts s
        JOIN dim_Date d ON s.date_id = d.date_id
        LEFT JOIN assignments a ON a.shift_id = s.shift_id
        LEFT JOIN roles r ON s.role_id = r.role_id
        WHERE a.shift_id IS NULL;
    `;

    try {
        const results = await query(sqlQuery);
        return results;

    } catch (error) {
        console.error('Error executing query:', error);
        throw new Error('Failed to fetch shifts from the database');
    }
};