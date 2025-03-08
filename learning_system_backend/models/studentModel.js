import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  attendance: [
    {
      month: String,
      presentDays: Number,
      totalDays: Number,
      percentage: Number,
    },
  ],
  progress: [
    {
      teacher: String,
      subject: String,
      date: Date,
      remarks: String,
    },
  ],
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
