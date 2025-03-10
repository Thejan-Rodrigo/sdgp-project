import express from 'express';
import lessonsController from '../controllers/lessonsController.js';

const router = express.Router();

// Get all lessons
router.get('/', lessonsController.getAllLessons);

export default router; 