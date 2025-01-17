import { getDatesByMonthAndYearModel, updateDateModel, getDatesIdForShiftModel, insertDateModel } from '../models/dateModel.js';

export const getDatesByMonthAndYearLogic = async (month, year) => {
    try {
        // Call the model function to get dates by month and year
        const result = await getDatesByMonthAndYearModel(month, year);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve dates by month and year.');
    }
};

export const updateDateLogic = async (dateId) => {
    try {
        // Call the model function to update the date in the database
        const result = await updateDateModel(dateId);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to update the date.');
    }
};

export const getDatesForShiftLogic = async (dates) => {
    try {

        // Call the model function to get date IDs for the shift
        const result = await getDatesIdForShiftModel(dates);

        return result;
    } catch (error) {
        console.error('Error in getDatesForShift logic:', error);
        throw new Error('Failed to retrieve dates for the shift.');
    }
};

export const createDateLogic = async (fullDate) => {
    if (!fullDate) {
        throw new Error("Missing required parameter: fullDate");
    }

    try {

        const dayOfWeek = new Date(fullDate).getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6) ? 1 : 0;
        const isHoliday = 0; // Customize as needed

        // Insert the new date
        await insertDateModel(fullDate, dayOfWeek, isHoliday, isWeekend);

        console.log(`Date ${fullDate} inserted successfully into dim_date.`);
    } catch (err) {
        console.error("Error in createDateIfNotExists:", err);
        throw err;
    }
};