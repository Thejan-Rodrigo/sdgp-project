// models/attendanceModel.js
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  month: { type: String, required: true },
  percentage: { type: Number, required: true },
  presentDays: { type: Number, required: true },
  totalDays: { type: Number, required: true }
});

export default mongoose.model("Attendance", attendanceSchema);
