// controllers/progressController.js
import { successResponse } from "../utils/responseHandler.js";
import { 
  getProgressByStudentId, 
  createProgressNote, 
  getStudentsBySchoolId as getStudentsBySchoolIdService 
} from "../services/progressService.js";

export const getProgressByStudent = async (req, res) => {
  try {
    const progress = await getProgressByStudentId(req.params.id);
    successResponse(res, 200, { progress }, "Progress history retrieved successfully");
  } catch (error) {
    console.error("Error fetching progress history:", error);
    successResponse(res, 500, null, "Error fetching progress history");
  }
};

export const addProgress = async (req, res) => {
  try {
    const { studentId, teacherId, notes } = req.body; // Include teacherId
    const newProgress = await createProgressNote(studentId, teacherId, notes); // Pass teacherId
    successResponse(res, 201, { newProgress }, "Progress note added successfully");
  } catch (error) {
    console.error("Error adding progress note:", error);
    successResponse(res, 500, null, "Error adding progress note");
  }
};

export const getStudentsBySchoolId = async (req, res) => {
  try {
    const students = await getStudentsBySchoolIdService(req.params.schoolId);
    successResponse(res, 200, { students }, "Students retrieved successfully");
  } catch (error) {
    console.error("Error fetching students by school ID:", error);
    successResponse(res, 500, null, "Error fetching students by school ID");
  }
};