import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  month: String,
  presentDays: Number,
  totalDays: Number,
  percentage: Number,
});

export default mongoose.model("Attendance", attendanceSchema);
