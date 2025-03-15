import Student from "../models/studentModel.js";

// Get a student by ID
export const getStudentById = async (id) => {
  try {
    console.log("Looking for student with ID:", id);
    const student = await Student.findById(id); // Use findById instead of findOne
    console.log(student);
    if (!student) {
      throw new Error("Student not found");
    }
    return student;
  } catch (error) {
    console.error("Error retrieving student:", error.message);
    throw new Error("Error retrieving student: " + error.message);
  }
};
