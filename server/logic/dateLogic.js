import { getDatesByMonthAndYearModel, updateDateModel, getDatesIdForShiftModel } from '../models/dateModel.js';

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

export const getDatesForShiftLogic = async (repeat) => {
    try {
        const { days, startDate, endDate, frequency } = repeat;

        // Call the model function to get date IDs for the shift
        const result = await getDatesIdForShiftModel(days, startDate, endDate, frequency);
        return result;
    } catch (error) {
        console.error('Error in getDatesForShift logic:', error);
        throw new Error('Failed to retrieve dates for the shift.');
    }
};
