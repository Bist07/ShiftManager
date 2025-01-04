import { mapWeekToDays } from "./dateUtils";

export const getShiftDetails = (shift, day, formatTime) => {
    const shiftDetails = shift.shiftDays[day];
    if (!shiftDetails) return 'No Shift Assigned';
    return `${formatTime(shiftDetails.start_time)} - ${formatTime(shiftDetails.end_time)}`;
};

export const transformShifts = (shifts, week, filters) => {
    if (!week || Object.keys(week).length < 2) {
        return []; // Return an empty array if the week is invalid
    }

    const groupedShifts = {};

    // If filters are provided, apply them; otherwise, no filtering.
    const filteredShifts = filters ? shifts.filter(({ e_id, location_id, position_id }) => {
        const { employeeFilters, locationsFilters, positionsFilters } = filters;

        // If any filter is empty, it means no filtering is done for that category
        const employeeMatch = employeeFilters.length === 0 || employeeFilters.includes(e_id);
        const locationMatch = locationsFilters.length === 0 || locationsFilters.includes(location_id);
        const positionMatch = positionsFilters.length === 0 || positionsFilters.includes(position_id);

        return employeeMatch && locationMatch && positionMatch;
    }) : shifts; // No filtering if filters are undefined

    // Ensure the week is mapped correctly
    week = mapWeekToDays(week);

    console.log('Filters:', filters);

    // Iterate through each shift and group them by employee
    filteredShifts.forEach(({ e_id, shift_id, name, location_id, start_time, end_time, date }) => {
        if (!groupedShifts[e_id]) {
            groupedShifts[e_id] = { e_id, name, shiftDays: {} };
        }

        // Iterate through each day of the week
        Object.keys(week).forEach((dayName) => {
            // Ensure the date comparison is done properly by standardizing both dates
            const weekDate = new Date(week[dayName][0].date).toLocaleDateString();
            const shiftDate = new Date(date).toLocaleDateString();

            if (weekDate === shiftDate) {
                groupedShifts[e_id].shiftDays[dayName] = {
                    shift_id,
                    location_id,
                    start_time: start_time || 'N/A',
                    end_time: end_time || 'N/A',
                    date: date || null,
                };
            }
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