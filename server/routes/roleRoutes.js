// routes/roleRoutes.js
import express from 'express';
import { getRole } from '../controllers/roleController.js';


export const router = express.Router();

// Define the GET route for role
router.get('/', getRole);