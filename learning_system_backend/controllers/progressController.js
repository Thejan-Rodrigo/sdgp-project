import { successResponse } from "../utils/responseHandler.js";
import { 
  getProgressByStudentId, 
  createProgressNote, 
  getStudentsBySchoolId as getStudentsBySchoolIdService, // Rename the imported function to avoid conflict
  deleteProgressById as deleteProgressByIdService // Import the new service function
} from "../services/progressService.js";

// Fetch progress history for a student
export const getProgressByStudent = async (req, res) => {
  try {
    const progress = await getProgressByStudentId(req.params.id);
    successResponse(res, 200, { progress }, "Progress history retrieved successfully");
  } catch (error) {
    console.error("Error fetching progress history:", error);
    successResponse(res, 500, null, "Error fetching progress history");
  }
};

// Add a new progress note
export const addProgress = async (req, res) => {
  try {
    const { studentId, teacherId, notes } = req.body;
    const newProgress = await createProgressNote(studentId, teacherId, notes);
    successResponse(res, 201, { newProgress }, "Progress note added successfully");
  } catch (error) {
    console.error("Error adding progress note:", error);
    successResponse(res, 500, null, "Error adding progress note");
  }
};

// Fetch students by school ID
export const getStudentsBySchoolId = async (req, res) => {
  try {
    const students = await getStudentsBySchoolIdService(req.params.schoolId);
    successResponse(res, 200, { students }, "Students retrieved successfully");
  } catch (error) {
    console.error("Error fetching students by school ID:", error);
    successResponse(res, 500, null, "Error fetching students by school ID");
  }
};

// Delete progress by ID
export const deleteProgressById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProgress = await deleteProgressByIdService(id);

    if (!deletedProgress) {
      return successResponse(res, 404, null, "Progress note not found");
    }

    successResponse(res, 200, { deletedProgress }, "Progress note deleted successfully");
  } catch (error) {
    console.error("Error deleting progress note:", error);
    successResponse(res, 500, null, "Error deleting progress note");
  }
};