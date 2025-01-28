import { mapWeekToDays } from "./dateUtils";

export const GroupUnassignedShiftsByDate = (unassignedShifts) => {
    return unassignedShifts.reduce((acc, shift) => {
        const date = shift.full_date;
        acc[date] = acc[date] || [];
        acc[date].push(shift);
        return acc;
    }, {});
};


export const filterShifts = (shifts, filters) => {

    // If filters are provided, apply them; otherwise, no filtering.
    const filteredShifts = filters ? shifts.filter(({ e_id, location_id, position_id }) => {
        const { Employee, Location, Position } = filters;

        // If any filter is empty, it means no filtering is done for that category
        const employeeMatch = Employee.length === 0 || Employee.includes(e_id);
        const locationMatch = Location.length === 0 || Location.includes(location_id);
        const positionMatch = Position.length === 0 || Position.includes(position_id);

        return employeeMatch && locationMatch && positionMatch;
    }) : shifts; // No filtering if filters are undefined



    return Object.values(filteredShifts); // Convert the object to an array of grouped shifts
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

export const getShiftDetails = (shift, date) => {

    if (shift.shiftDays) {
        const shiftForDay = shift.shiftDays[date]; // This gives you the array for that date
        const startTime = shiftForDay && shiftForDay[0] ? shiftForDay[0].start_time : null;
        const endTime = shiftForDay && shiftForDay[0] ? shiftForDay[0].end_time : null;
        const position = shiftForDay && shiftForDay[0] ? shiftForDay[0].position_name : null;
        const location = shiftForDay && shiftForDay[0] ? shiftForDay[0].location_name : null;
        const name = shift.name;
        const shift_id = shiftForDay && shiftForDay[0] ? shiftForDay[0].shift_id : null;

        return { startTime, endTime, position, location, name, shift_id }
    }
    const startTime = shift?.start_time;
    const endTime = shift?.end_time;
    const position = shift?.position_name;
    const location = shift?.location_name;
    const name = shift?.name;
    const shift_id = shift?.shift_id;

    return { startTime, endTime, position, location, name, shift_id }
}