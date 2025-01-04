// routes/shiftRoutes.js
import express from 'express';
import { createAndAssignShiftsInBulk, deleteShiftsAndAssignments } from '../models/shiftBulkOperationsModel.js';

export const router = express.Router();

//Post route to create a shift
router.post('/create', async (req, res) => {
    const { day, repeat, e_id, location_id, start_time, end_time } = req.body;

    try {
        const result = await createAndAssignShiftsInBulk(day, repeat, e_id, location_id, start_time, end_time);
        res.status(200).json(result); // Send success response
    } catch (error) {
        console.error('Error in bulk shift creation:', error);
        res.status(500).json({ message: 'Failed to create and assign shifts in bulk.' });
    }
});

// Delete route to delete a shift and its assignments
router.delete('/delete', async (req, res) => {
    const { e_id, shift_id } = req.body;

    try {
        const result = await deleteShiftsAndAssignments(e_id, shift_id);
        res.status(200).json(result); // Send success response
    } catch (error) {
        console.error('Error in deleting shifts and assignments:', error);
        res.status(500).json({ message: 'Failed to delete shifts and assignments.' });
    }
});