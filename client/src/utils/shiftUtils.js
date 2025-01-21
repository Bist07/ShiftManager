import { mapWeekToDays } from "./dateUtils";

export const getShiftDetails = (shift, date, formatTime) => {
    const shiftDetails = shift.shiftDays[date];
    if (!shiftDetails) return 'No Shift Assigned';
    return `${formatTime(shiftDetails[0].start_time)} - ${formatTime(shiftDetails[0].end_time)}`;
};

export const GroupUnassignedShiftsByDate = (unassignedShifts) => {
    return unassignedShifts.reduce((acc, shift) => {
        const date = shift.full_date;
        acc[date] = acc[date] || [];
        acc[date].push(shift);
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
    filteredShifts.forEach(({ e_id, shift_id, name, location_id, start_time, end_time, full_date, role_id, role_name, location_name }) => {
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
            location_name,
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
        let IsAlreadyScheduled = false;
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
                    IsAlreadyScheduled = true;
                }
            }
        });

        // Group conflicts by employee ID
        const ScheduleConflict = conflicts.reduce((acc, detail) => {
            if (!acc[detail.e_id]) {
                acc[detail.e_id] = [];
            }
            acc[detail.e_id].push(detail);

            return acc;
        }, {});

        // Return grouped conflicts (if empty, no conflicts)
        return { ScheduleConflict, IsAlreadyScheduled };

    } catch (error) {
        console.error('Error validating shift:', error);
        return true;
    }
};
