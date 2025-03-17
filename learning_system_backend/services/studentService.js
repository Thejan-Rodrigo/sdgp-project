import Student from "../models/Student.js";
import User from "../models/User.js"; // Import the User model (assuming Parent is in the users collection)
import Progress from "../models/Progress.js"; // Import the Progress model

export const getAllStudents = async () => {
  return await Student.find();
};

export const fetchStudentProfile = async (studentId) => {
  return await Student.findById(studentId);
};

export const fetchStudentAttendance = async (studentId) => {
  return await Attendance.find({ studentId });
};

export const fetchStudentProgress = async (studentId) => {
  return await Progress.find({ studentId });
};

export const getStudentById = async (studentId) => {
  return await Student.findOne({ studentId });
};

export const getStudentsBySchoolId = async (schoolId) => {
  try {
    const students = await Student.find({ schoolId });
    return students;
  } catch (error) {
    throw new Error("Error fetching students");
  }
};

export const updateStudentById = async (studentId, updatedData) => {
  try {
    const student = await Student.findByIdAndUpdate(studentId, updatedData, { new: true });
    return student;
  } catch (error) {
    throw new Error("Error updating student details");
  }
};

export const getStudentByParentId = async (studentIds) => {
  try {
    const students = await Student.find({ _id: { $in: studentIds } });
    return students;
  } catch (error) {
    throw new Error("Error fetching students by parent ID");
  }
};

export const getParentById = async (parentId) => {
  try {
    const parent = await User.findById(parentId); // Fetch from the users collection
    return parent;
  } catch (error) {
    throw new Error("Error fetching parent");
  }
};

// New service to get progress by parent ID
export const getProgressByParentId = async (studentIds) => {
  try {
    // Fetch progress data for the student(s) associated with the parent
    const progress = await Progress.find({ studentId: { $in: studentIds } });
    return progress;
  } catch (error) {
    throw new Error("Error fetching progress by parent ID");
  }
};