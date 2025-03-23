import express from 'express';
import attendanceController from '../controllers/attendanceController.js';

const router = express.Router();

// Get all attendance records
router.get('/', attendanceController.getAllAttendance);

// Get attendance record by date
router.get('/:date', attendanceController.getAttendanceByDate);

// Create or update attendance record
router.post('/', attendanceController.saveAttendance);

// Initialize attendance with all students
router.post('/initialize', attendanceController.initializeAttendance);

// Delete attendance record
router.delete('/:date', attendanceController.deleteAttendance);

// Get students by school ID
router.get('/sch/:schoolId', attendanceController.getStudentsBySchoolId);

export default router; 