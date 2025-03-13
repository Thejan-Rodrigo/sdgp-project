import Progress from "../models/progress.js";
import Student from "../models/Student.js"; // Assuming you have a Student model
import User from "../models/User.js"; // Assuming the teacher details are in the User model

// Fetch progress history for a student
export const getProgressByStudentId = async (studentId) => {
  return await Progress.find({ studentId })
    .sort({ createdAt: -1 })
    .populate({
      path: "teacherId",
      select: "firstName lastName", // Select only the firstName and lastName fields
      model: User, // Explicitly specify the model to use
    });
};

// Add a new progress note
export const createProgressNote = async (studentId, teacherId, notes) => {
  const progress = new Progress({ studentId, teacherId, notes }); // Include teacherId
  return await progress.save();
};

// Fetch students by school ID
export const getStudentsBySchoolId = async (schoolId) => {
  return await Student.find({ schoolId }); // Assuming your Student model has a `schoolId` field
};