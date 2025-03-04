import User from '../models/User.js';
import catchAsync from '../utils/catchAsync.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

const userController = {
  // Get all students
  getAllStudents: catchAsync(async (req, res) => {
    const students = await User.find({ role: 'student' })
      .select('_id firstName lastName email')
      .sort({ lastName: 1, firstName: 1 });
    
    if (!students || students.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No students found'
      });
    }
    
    successResponse(res, { students }, 'Students fetched successfully');
  }),
  
  // Get user by ID
  getUserById: catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    successResponse(res, { user }, 'User fetched successfully');
  })
};

export default userController; 