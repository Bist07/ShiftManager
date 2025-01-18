import { mapWeekToDays, formatDate } from "./dateUtils";
import dayjs from 'dayjs';

export const getShiftDetails = (shift, date, formatTime) => {
    const shiftDetails = shift.shiftDays[date];
    if (!shiftDetails) return 'No Shift Assigned';
    return `${formatTime(shiftDetails[0].start_time)} - ${formatTime(shiftDetails[0].end_time)}`;
};

export const GroupUnassignedShiftsByDate = (unassignedShifts) => {
    return unassignedShifts.reduce((acc, shift) => {
        const formattedDate = formatDate(shift.full_date);
        acc[formattedDate] = acc[formattedDate] || [];
        acc[formattedDate].push(shift);
        return acc;
    }, {});
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
    filteredShifts.forEach(({ e_id, shift_id, name, location_id, start_time, end_time, full_date, role_id, role_name }) => {
        if (!groupedShifts[e_id]) {
            groupedShifts[e_id] = { e_id, name, shiftDays: {} };
        }

        // Group shifts by the date
        groupedShifts[e_id].shiftDays[full_date] = groupedShifts[e_id].shiftDays[full_date] || [];

        // Add the shift details to the respective date
        groupedShifts[e_id].shiftDays[full_date].push({
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

export const ValidateShift = (shifts, e_id, dates, start_time, end_time) => {
    if (!e_id || !dates || !start_time || !end_time) {
        console.error('Invalid input: e_id, repeat, start_time, or end_time is missing');
        return false;
    }

    try {

        // Collect conflicts
        const conflicts = [];

        // Check for conflicts based on matching date
        shifts.forEach((shift) => {
            if (e_id.includes(shift.e_id) && dates.includes(shift.full_date)) {
                const shiftStart = new Date(`1970-01-01T${shift.start_time}Z`);
                const shiftEnd = new Date(`1970-01-01T${shift.end_time}Z`);
                const newStart = new Date(`1970-01-01T${start_time}Z`);
                const newEnd = new Date(`1970-01-01T${end_time}Z`);

                if (
                    (newStart >= shiftStart && newStart < shiftEnd) || // Overlaps at the start
                    (newEnd > shiftStart && newEnd <= shiftEnd) ||    // Overlaps at the end
                    (newStart <= shiftStart && newEnd >= shiftEnd)    // Completely overlaps existing shift
                ) {
                    conflicts.push({
                        e_id: shift.e_id, // Include matched e_id
                        date: shift.full_date,   // Include the full date
                        shiftStart: shift.start_time,
                        shiftEnd: shift.end_time,
                        conflictStart: start_time,
                        conflictEnd: end_time,
                    });
                }
            }
        });

        // Group conflicts by employee ID
        const groupedConflicts = conflicts.reduce((acc, detail) => {
            if (!acc[detail.e_id]) {
                acc[detail.e_id] = [];
            }
            acc[detail.e_id].push(detail);

            return acc;
        }, {});

        // Return grouped conflicts (if empty, no conflicts)
        return groupedConflicts;

    } catch (error) {
        console.error('Error validating shift:', error);
        return false;
    }
};

export const getMaxDate = (unassignedShifts) => {
    if (!unassignedShifts || unassignedShifts.length === 0) return null;

    return unassignedShifts.reduce((maxDate, shift) => {
        const shiftDate = new Date(shift.full_date); // Assuming `full_date` is a valid date string

        if (!maxDate || shiftDate > maxDate) {
            return shiftDate;
        }

        return maxDate;
    }, null);
};

export const getMinDate = (unassignedShifts) => {
    if (!unassignedShifts || unassignedShifts.length === 0) return null;
    return unassignedShifts.reduce((minDate, shift) => {
        const shiftDate = new Date(shift.full_date); // Assuming `full_date` is a valid date string

        if (!minDate || shiftDate < minDate) {
            return shiftDate;
        }

        return minDate;
    }, null);
};