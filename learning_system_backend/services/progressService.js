import Progress from "../models/progress.js";
import Student from "../models/Student.js"; // Assuming you have a Student model

// Fetch progress history for a student
export const getProgressByStudentId = async (studentId) => {
  return await Progress.find({ studentId }).sort({ createdAt: -1 });
};

// Add a new progress note
export const createProgressNote = async (studentId, notes) => {
  const progress = new Progress({ studentId, notes });
  return await progress.save();
};

// Fetch students by school ID
export const getStudentsBySchoolId = async (schoolId) => {
  return await Student.find({ schoolId }); // Assuming your Student model has a `schoolId` field
};