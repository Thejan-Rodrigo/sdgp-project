import Student from "../models/studentModel.js";

// Get a student by ID
export const getStudentById = async (id) => {
  try {
    const student = await Student.findOne({ studentId: id });
    if (!student) {
      throw new Error("Student not found");
    }
    return student;
  } catch (error) {
    throw new Error("Error retrieving student: " + error.message);
  }
};

export default getStudentById;
