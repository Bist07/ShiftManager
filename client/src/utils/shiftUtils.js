import { mapWeekToDays } from "./dateUtils";
import { fetchDateIds } from '../services/api/dateApi';
import { fetchShiftsForValidation } from "../services/api/shiftApi";

export const getShiftDetails = (shift, date, formatTime) => {
    const shiftDetails = shift.shiftDays[date];
    if (!shiftDetails) return 'No Shift Assigned';
    return `${formatTime(shiftDetails[0].start_time)} - ${formatTime(shiftDetails[0].end_time)}`;
};

export const transformShifts = (shifts, filters) => {
    const groupedShifts = {};

    // If filters are provided, apply them; otherwise, no filtering.
    const filteredShifts = filters ? shifts.filter(({ e_id, location_id, role_id }) => {
        const { employeeFilters, locationFilters, roleFilters } = filters;

        // If any filter is empty, it means no filtering is done for that category
        const employeeMatch = employeeFilters.length === 0 || employeeFilters.includes(e_id);
        const locationMatch = locationFilters.length === 0 || locationFilters.includes(location_id);
        const roleMatch = roleFilters.length === 0 || roleFilters.includes(role_id);

        return employeeMatch && locationMatch && roleMatch;
    }) : shifts; // No filtering if filters are undefined

    // Iterate through each shift and group them by employee
    filteredShifts.forEach(({ e_id, shift_id, name, location_id, start_time, end_time, date, role_id, role_name }) => {
        if (!groupedShifts[e_id]) {
            groupedShifts[e_id] = { e_id, name, shiftDays: {} };
        }

        // Format the shift date to a standard format for comparison (e.g., YYYY-MM-DD)
        const shiftDate = new Date(date).toLocaleDateString();

        // Group shifts by the date
        groupedShifts[e_id].shiftDays[shiftDate] = groupedShifts[e_id].shiftDays[shiftDate] || [];

        // Add the shift details to the respective date
        groupedShifts[e_id].shiftDays[shiftDate].push({
            shift_id,
            role_id,
            role_name,
            location_id,
            start_time: start_time || 'N/A',
            end_time: end_time || 'N/A',
        });
    });

    return Object.values(groupedShifts); // Convert the object to an array of grouped shifts
};


export const getScheduledHours = (e_id, shifts, period) => {
    let scheduledHours = 0;

    // Ensure the week is mapped correctly
    period = mapWeekToDays(period);

    shifts.forEach(({ shiftDays }) => {
        Object.keys(shiftDays).forEach((day) => {
            const shift = shiftDays[day];
            if (shift.start_time && shift.end_time) {
                const startTime = new Date(shift.start_time);
                const endTime = new Date(shift.end_time);
                const hours = (endTime - startTime) / 1000 / 60 / 60;
                scheduledHours += hours;
            }
        });
    });

    return scheduledHours;
}

export const ValidateShift = async (e_id, repeat, start_time, end_time) => {
    // Validate input
    if (!e_id || !repeat || !start_time || !end_time) {
        console.error('Invalid input: e_id, repeat, start_time, or end_time is missing');
        return false;
    }

    try {
        // Fetch date IDs based on the repeat pattern
        const date_ids = await fetchDateIds(repeat);
        if (!date_ids || date_ids.length === 0) {
            console.error('No date IDs found for the given repeat pattern');
            return false;
        }

        // Fetch shifts for the employee within the given date range
        const shifts = await fetchShiftsForValidation(e_id, date_ids);


        // Check for conflicts based on matching date_id
        for (const shift of shifts) {
            if (date_ids.includes(shift.date_id)) {
                // Match found, check for time overlap
                const shiftStart = new Date(`1970-01-01T${shift.start_time}Z`);
                const shiftEnd = new Date(`1970-01-01T${shift.end_time}Z`);
                const newStart = new Date(`1970-01-01T${start_time}Z`);
                const newEnd = new Date(`1970-01-01T${end_time}Z`);

                if (
                    (newStart >= shiftStart && newStart < shiftEnd) || // Overlaps at the start
                    (newEnd > shiftStart && newEnd <= shiftEnd) ||    // Overlaps at the end
                    (newStart <= shiftStart && newEnd >= shiftEnd)    // Completely overlaps existing shift
                ) {
                    console.error('Shift conflict detected for date_id:', shift.date_id, { shift, newStart, newEnd });
                    return false;
                }
            }
        }

        // No conflicts found
        return true;

    } catch (error) {
        console.error('Error validating shift:', error);
        return false;
    }
};

