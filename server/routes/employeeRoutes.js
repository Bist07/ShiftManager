import express from 'express';
import { getEmployee, updateEmployee, createEmployee, deleteEmployee } from '../controllers/employeeController.js';


export const router = express.Router();

router.get('/', getEmployee);
router.put('/update', updateEmployee);
router.post('/create', createEmployee);
router.delete('/delete', deleteEmployee);