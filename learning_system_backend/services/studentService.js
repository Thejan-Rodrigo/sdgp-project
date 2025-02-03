import Student from "../models/Student.js";

// Fetch all students
export const getAllStudents = async () => {
  return await Student.find();
}

// Fetch Student Profile
export const fetchStudentProfile = async (studentId) => {
  return await Student.findById(studentId);
};

// Fetch Student Attendance
export const fetchStudentAttendance = async (studentId) => {
  return await Attendance.find({ studentId });
};

// Fetch Student Progress
export const fetchStudentProgress = async (studentId) => {
  return await Progress.find({ studentId });
}
export const getStudentById = async (studentId) => {
  return await Student.findOne({ studentId });
};


export const getStudentsBySchoolId = async (schoolId) => {
  try {
    console.log("s1");
    // Find all students associated with the given school ID
    const students = await Student.find({ schoolId });

    // Return the list of students
    console.log("s2");
    return students;

  } catch (error) {
    throw new Error("Error fetching students");
  }
};

//update student details
export const updateStudentById = async (studentId, updatedData) => {
  try {
    const student = await Student.findByIdAndUpdate(studentId, updatedData, { new: true });
    return student;
  } catch (error) {
    throw new Error("Error updating student details");
  }
};
