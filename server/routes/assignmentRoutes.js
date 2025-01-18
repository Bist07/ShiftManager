// routes/assignmentRoutes.js
import express from 'express';
import { deleteAssignment, assignShiftsToEmployees } from '../controllers/assignmentController.js';


export const router = express.Router();


router.delete('/delete', deleteAssignment);
router.post('/create', assignShiftsToEmployees);