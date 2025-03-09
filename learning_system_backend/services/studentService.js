import Student from "../models/studentModel.js";
import Attendance from "../models/attendanceModel.js";
import Progress from "../models/progressModel.js";

import mongoose from "mongoose";

export const getStudentData = async (studentId) => {
  try {
    console.log("service");

    // Convert studentId to ObjectId
    const student = await Student.findOne({ _id: new mongoose.Types.ObjectId(studentId) });

    console.log(student);
    if (!student) throw new Error("Student not found");

    // const attendance = await Attendance.find({ studentId });
    // const progress = await Progress.find({ studentId }).select("notes createdAt");
    // , attendance, progress
    return { student };
  } catch (error) {
    throw new Error(error.message);
  }
};
