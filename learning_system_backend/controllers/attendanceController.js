import Attendance from '../models/Attendance.js';
import User from '../models/User.js';
import catchAsync from '../utils/catchAsync.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

const attendanceController = {
  // Get all attendance records
  getAllAttendance: catchAsync(async (req, res) => {
    const attendance = await Attendance.find().sort({ date: -1 });
    successResponse(res, { attendance }, 'Attendance records fetched successfully');
  }),

  // Get attendance record by date
  getAttendanceByDate: catchAsync(async (req, res) => {
    const { date } = req.params;
    const attendance = await Attendance.findOne({ date });
    
    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found for this date'
      });
    }
    
    successResponse(res, { attendance }, 'Attendance record fetched successfully');
  }),

  // Create or update attendance record
  saveAttendance: catchAsync(async (req, res) => {
    try {
      const { date, students } = req.body;
      
      console.log('Saving attendance with data:', JSON.stringify(req.body, null, 2));
      
      // Validate request body
      if (!date) {
        console.log('Missing date in request');
        return errorResponse(res, 'Date is required', 400);
      }
      
      if (!students) {
        console.log('Missing students in request');
        return errorResponse(res, 'Students array is required', 400);
      }
      
      if (!Array.isArray(students)) {
        console.log('Students is not an array:', typeof students);
        return errorResponse(res, 'Students must be an array', 400);
      }
      
      // Validate student data
      for (let i = 0; i < students.length; i++) {
        const student = students[i];
        if (!student.id) {
          console.log(`Student at index ${i} is missing id:`, student);
          return errorResponse(res, `Student at index ${i} is missing id`, 400);
        }
        if (!student.name) {
          console.log(`Student at index ${i} is missing name:`, student);
          return errorResponse(res, `Student at index ${i} is missing name`, 400);
        }
        if (typeof student.present !== 'boolean') {
          console.log(`Student at index ${i} has invalid present value:`, student.present);
          return errorResponse(res, `Student at index ${i} has invalid present value`, 400);
        }
        
        // Ensure id is a string
        students[i].id = String(student.id);
      }
      
      // Find existing record or create new one
      let attendance = await Attendance.findOne({ date });
      
      if (attendance) {
        // Update existing record
        console.log('Updating existing attendance record for date:', date);
        attendance.students = students;
        attendance.updatedAt = Date.now();
        
        try {
          await attendance.save();
          console.log('Attendance record updated successfully');
          successResponse(res, { attendance }, 'Attendance record updated successfully');
        } catch (error) {
          console.error('Error saving attendance update:', error);
          return errorResponse(res, `Error updating attendance: ${error.message}`, 500);
        }
      } else {
        // Create new record
        console.log('Creating new attendance record for date:', date);
        try {
          attendance = new Attendance({
            date,
            students
          });
          await attendance.save();
          console.log('New attendance record created successfully');
          successResponse(res, { attendance }, 'Attendance record created successfully');
        } catch (error) {
          console.error('Error creating attendance record:', error);
          return errorResponse(res, `Error creating attendance: ${error.message}`, 500);
        }
      }
    } catch (error) {
      console.error('Unexpected error in saveAttendance:', error);
      return errorResponse(res, `Unexpected error: ${error.message}`, 500);
    }
  }),

  // Delete attendance record
  deleteAttendance: catchAsync(async (req, res) => {
    const { date } = req.params;
    const attendance = await Attendance.findOneAndDelete({ date });
    
    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found for this date'
      });
    }
    
    successResponse(res, {}, 'Attendance record deleted successfully');
  }),
  
  // Initialize attendance with all students
  initializeAttendance: catchAsync(async (req, res) => {
    const { date } = req.body;
    
    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required'
      });
    }
    
    // Check if attendance record already exists for this date
    const existingAttendance = await Attendance.findOne({ date });
    
    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message: 'Attendance record already exists for this date'
      });
    }
    
    // Get all students
    const students = await User.find({ role: 'student' })
      .select('_id firstName lastName')
      .sort({ lastName: 1, firstName: 1 });
    
    if (!students || students.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No students found'
      });
    }
    
    // Create attendance record with all students marked as absent
    const attendanceData = {
      date,
      students: students.map(student => ({
        id: student._id.toString(),
        name: `${student.firstName} ${student.lastName}`,
        present: false
      }))
    };
    
    const attendance = new Attendance(attendanceData);
    await attendance.save();
    
    successResponse(res, { attendance }, 'Attendance record initialized successfully');
  })
};

export default attendanceController; 