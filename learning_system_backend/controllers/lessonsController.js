import Lesson from '../models/Lesson.js';
import catchAsync from '../utils/catchAsync.js';
import { successResponse } from '../utils/responseHandler.js';

const lessonsController = {
  getAllLessons: catchAsync(async (req, res) => {
    const lessons = await Lesson.find(); // Fetch all lessons from the database
    successResponse(res, { lessons }, 'Lessons fetched successfully');
  }),
};

export default lessonsController; 