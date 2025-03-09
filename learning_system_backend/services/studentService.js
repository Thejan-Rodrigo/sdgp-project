// services/studentService.js
import Student from "../models/studentModel.js";
import Attendance from "../models/attendanceModel.js";
import Progress from "../models/progressModel.js";

export const getStudentData = async (studentId) => {
  try {
    console.log("service");
    const student = await Student.findOne({ studentId });
    console.log(student);
    if (!student) throw new Error("Student not found");
    console.log(student);
    const attendance = await Attendance.find({ studentId });
    const progress = await Progress.find({ studentId }).select("notes createdAt");

    return { student, attendance, progress };
  } catch (error) {
    throw new Error(error.message);
  }
};
