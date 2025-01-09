import { getAvailabilityModel, updateAvailabilityModel, createAvailabilityModel } from '../models/availabilityModel.js';

export const getAvailabilityLogic = async () => {
    try {
        const availability = await getAvailabilityModel();
        return availability;
    } catch (error) {
        console.error('Error fetching availability:', error);
        throw new Error('Failed to fetch availability data.');
    }
};

export const updateAvailabilityLogic = async (e_id, day_of_week, start_time, end_time) => {
    try {
        const result = await updateAvailabilityModel(e_id, day_of_week, start_time, end_time);
        return result;
    } catch (error) {
        console.error('Error updating availability:', error);
        throw new Error('Failed to update availability data.');
    }
};

export const createAvailabilityLogic = async (e_id, day_of_week, start_time, end_time) => {
    try {
        const result = await createAvailabilityModel(e_id, day_of_week, start_time, end_time);
        return result;
    } catch (error) {
        console.error('Error creating availability:', error);
        throw new Error('Failed to create availability data.');
    }
};
