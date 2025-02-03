import Student from "../models/Student.js";

// Fetch all students
export const getAllStudents = async () => {
  return await Student.find();
};
