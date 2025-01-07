// routes/shiftRoutes.js
import express from 'express';
import { getShifts, updateShift, createShift, deleteShift, getShiftsForValidation } from '../controllers/shiftController.js';

export const router = express.Router();
// Define the GET route for shifts
router.get('/', getShifts);
router.get('/validation', async (req, res) => {
    const { e_id, date_ids } = req.query;
    try {
        const shifts = await getShiftsForValidation(e_id, date_ids);

        if (!shifts) {
            return res.status(404).json({ message: 'No shifts found for validation' });
        }

        res.status(200).json(shifts); // Send success response with shifts
    } catch (error) {
        console.error('Error fetching shifts for validation:', error);
        res.status(500).json({ message: error.message || 'An error occurred while fetching shifts' });
    }
});
// Put route to update a shift
router.put('/update', updateShift);

//Post route to create a shift
router.post('/create', createShift);

router.delete('/delete', deleteShift);