import { updateShift } from "./api/shiftApi";
import { createBulkShift, deleteShiftsAndAssignments } from "./api/shiftBulkOperationsApi";
import { deleteAssignment } from "./api/assignmentApi";

export async function handleShiftChanges(changes, shift_id, shiftData) {
    if (Object.keys(changes).length === 0) {
        console.log("No changes detected.");
        return;
    }

    console.log("Detected changes:", changes);

    // Case 5: Change in date or repeat (covers all scenarios)
    if (("date" in changes || "repeat" in changes) && "e_id" in changes) {
        console.log("Case 5: Change in date or repeat with e_id.");
        const { oldValue } = changes.e_id;
        await deleteShiftsAndAssignments(oldValue || [], shift_id);
        console.log("Deleted shifts and assignments for:", oldValue);
        await createBulkShift(
            shiftData.date,
            shiftData.repeat,
            shiftData.e_id,
            shiftData.role_id,
            shiftData.location_id,
            shiftData.start_time,
            shiftData.end_time
        );
        console.log("Created bulk shifts with updated date/repeat.");
        return;
    }

    // Handle changes in e_id
    if ("e_id" in changes) {
        console.log("Handling changes in e_id.");
        const { oldValue, newValue } = changes.e_id;

        // Case 2: More e_ids added without removing the old ones
        if (oldValue.every(e_id => newValue.includes(e_id))) {
            console.log("Case 2: Additional e_ids added without removal.");
            if ("start_time" in changes || "end_time" in changes || "location_id" in changes || "role_id" in changes) {
                await updateShift(shift_id, shiftData.start_time, shiftData.end_time, shiftData.location_id, shiftData.role_id);

            }
            const newEIDs = newValue.filter(e_id => !oldValue.includes(e_id));
            console.log("New e_ids to add:", newEIDs);

            await createBulkShift(
                shiftData.date,
                shiftData.repeat,
                newEIDs,
                shiftData.role_id,
                shiftData.location_id,
                shiftData.start_time,
                shiftData.end_time
            );
            console.log("Created bulk shift for new e_id:", newEIDs);

            return;
        }

        // Case 3: Old e_id removed, newValue is empty
        if (newValue.length === 0) {
            console.log("Case 3: All e_ids removed.");
            console.log(oldValue, shift_id)
            await deleteAssignment(oldValue, shift_id);
            console.log("Deleted assignment for:", oldValue);
            return;
        }

        // Case 4: Old e_id removed, new e_ids added
        console.log("Case 4: Old e_ids removed, new e_ids added.");
        const removedEIDs = oldValue.filter(e_id => !newValue.includes(e_id));
        console.log("Removed e_ids:", removedEIDs);
        await deleteShiftsAndAssignments(removedEIDs, shift_id);
        console.log("Deleted shifts and assignments for removed e_ids.");
        await createBulkShift(
            shiftData.date,
            shiftData.repeat,
            shiftData.e_id,
            shiftData.role_id,
            shiftData.location_id,
            shiftData.start_time,
            shiftData.end_time
        );
        console.log("Created bulk shift for new e_id:", shiftData.e_id);

        return;
    }

    // Case 1: Update shift timing if there are changes to timing, location, or role
    if ("start_time" in changes || "end_time" in changes || "location_id" in changes || "role_id" in changes) {
        console.log("Case 1: Updating shift timing, location, or role.");
        await updateShift(shift_id, shiftData.start_time, shiftData.end_time, shiftData.location_id, shiftData.role_id);
        console.log("Updated shift for shift_id:", shift_id);
    }
}
