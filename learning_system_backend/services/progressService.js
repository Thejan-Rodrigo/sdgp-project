import Progress from "../models/progress.js";
import Student from "../models/Student.js"; // Assuming you have a Student model
import User from "../models/User.js"; // Assuming you have a User model

// Fetch progress history for a student
export const getProgressByStudentId = async (studentId) => {
  return await Progress.find({ studentId })
    .sort({ createdAt: -1 })
    .populate({
      path: "teacherId",
      select: "firstName lastName",
      model: User,
    });
};

// Add a new progress note
export const createProgressNote = async (studentId, teacherId, notes) => {
  const progress = new Progress({ studentId, teacherId, notes });
  return await progress.save();
};

// Fetch students by school ID
export const getStudentsBySchoolId = async (schoolId) => {
  return await Student.find({ schoolId });
};

// Delete progress by ID
export const deleteProgressById = async (progressId) => {
  return await Progress.findByIdAndDelete(progressId);
};