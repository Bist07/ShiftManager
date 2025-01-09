// routes/shiftRoutes.js
import express from 'express';
import { getShifts, updateShift, createShift, deleteShift, getShiftsForValidation } from '../controllers/shiftController.js';

export const router = express.Router();
// Define the GET route for shifts
router.get('/', getShifts);
router.get('/validation', getShiftsForValidation);
// Put route to update a shift
router.put('/update', updateShift);

//Post route to create a shift
router.post('/create', createShift);

router.delete('/delete', deleteShift);