// routes/shiftRoutes.js
import express from 'express';
import { createAndAssignShiftsInBulk, deleteShiftsAndAssignments } from '../controllers/shiftBulkOperationsController.js';

export const router = express.Router();

//Post route to create a shift
router.post('/create', createAndAssignShiftsInBulk);

// Delete route to delete a shift and its assignments
router.delete('/delete', deleteShiftsAndAssignments);