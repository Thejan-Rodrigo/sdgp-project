import Progress from "../models/progress.js";

// Fetch progress history for a student
export const getProgressByStudentId = async (studentId) => {
  return await Progress.find({ studentId }).sort({ createdAt: -1 });
};

// Add a new progress note
export const createProgressNote = async (studentId, notes) => {
  const progress = new Progress({ studentId, notes });
  return await progress.save();
};
