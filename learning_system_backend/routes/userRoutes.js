import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// Get all students
router.get('/students', userController.getAllStudents);

// Get user by ID
router.get('/:id', userController.getUserById);

export default router; 