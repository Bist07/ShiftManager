// routes/positionRoutes.js
import express from 'express';
import { getPosition } from '../controllers/positionController.js';


export const router = express.Router();

// Define the GET route for position
router.get('/', getPosition);