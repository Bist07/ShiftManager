import { updateShift } from "./api/shiftApi";
import { createBulkShift, deleteShiftsAndAssignments } from "./api/shiftBulkOperationsApi";
import { deleteAssignment } from "./api/assignmentApi";

export async function handleShiftChanges(changes, shift_id, shiftData) {
    if (Object.keys(changes).length === 0) {
        return;
    }



    // Case 5: Change in date or repeat (covers all scenarios)
    if (("date" in changes || "repeat" in changes) && "e_id" in changes) {

        const { oldValue } = changes.e_id;
        await deleteShiftsAndAssignments(oldValue || [], shift_id);

        await createBulkShift(
            shiftData.date,
            shiftData.repeat,
            shiftData.e_id,
            shiftData.role_id,
            shiftData.location_id,
            shiftData.start_time,
            shiftData.end_time
        );

        return;
    }

    // Handle changes in e_id
    if ("e_id" in changes) {

        const { oldValue, newValue } = changes.e_id;

        // Case 2: More e_ids added without removing the old ones
        if (oldValue.every(e_id => newValue.includes(e_id))) {

            if ("start_time" in changes || "end_time" in changes || "location_id" in changes || "role_id" in changes) {
                await updateShift(shift_id, shiftData.start_time, shiftData.end_time, shiftData.location_id, shiftData.role_id);

            }
            const newEIDs = newValue.filter(e_id => !oldValue.includes(e_id));


            await createBulkShift(
                shiftData.date,
                shiftData.repeat,
                newEIDs,
                shiftData.role_id,
                shiftData.location_id,
                shiftData.start_time,
                shiftData.end_time
            );


            return;
        }

        // Case 3: Old e_id removed, newValue is empty
        if (newValue.length === 0) {

            await deleteAssignment(oldValue, shift_id);

            return;
        }

        // Case 4: Old e_id removed, new e_ids added

        const removedEIDs = oldValue.filter(e_id => !newValue.includes(e_id));

        await deleteShiftsAndAssignments(removedEIDs, shift_id);

        await createBulkShift(
            shiftData.date,
            shiftData.repeat,
            shiftData.e_id,
            shiftData.role_id,
            shiftData.location_id,
            shiftData.start_time,
            shiftData.end_time
        );

        return;
    }

    // Case 1: Update shift timing if there are changes to timing, location, or role
    if ("start_time" in changes || "end_time" in changes || "location_id" in changes || "role_id" in changes) {

        await updateShift(shift_id, shiftData.start_time, shiftData.end_time, shiftData.location_id, shiftData.role_id);

    }
}
