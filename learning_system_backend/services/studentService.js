import Student from "../models/studentModel.js";

export const getStudentById = async (studentId) => {
  return await Student.findOne({ studentId });
};
