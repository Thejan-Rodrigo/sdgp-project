import Lesson from '../models/Lesson.js';
import catchAsync from '../utils/catchAsync.js';
import { successResponse } from '../utils/responseHandler.js';
import path from "path"; 
import lessonService from '../services/lessonService.js';

const lessonsController = {
  addLessons: catchAsync(async (req, res)=>{
    const { grade, title, description } = req.body;
    const image = req.file;
    if (!image) {
      
      return res.status(400).json({ message: "Image file is required" });
    }

    const imagePath = `/${path.basename(image.path)}`;
    
    const newLesson = await lessonService.addLesson({
      grade,
      title,
      description,
      image: imagePath, 
    });

    successResponse(res,{ newLesson }, "New Lesson added successfully");
    
  }),

  getAllLessons: catchAsync(async (req, res) => {
    const lessons = await Lesson.find(); // Fetch all lessons from the database
    successResponse(res, { lessons }, 'Lessons fetched successfully');
  }),
};

export default lessonsController; 