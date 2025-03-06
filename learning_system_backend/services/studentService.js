import Student from "../models/student.js";

// Fetch all students
export const getAllStudents = async () => {
  return await Student.find();
};
