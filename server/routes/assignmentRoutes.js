// routes/assignmentRoutes.js
import express from 'express';
import { deleteAssignment } from '../controllers/assignmentController.js';


export const router = express.Router();


router.delete('/delete', deleteAssignment);