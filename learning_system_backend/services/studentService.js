import Student from "../models/student.js";
import Attendance from "../models/attendance.js";
import Progress from "../models/progress.js";

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
};
