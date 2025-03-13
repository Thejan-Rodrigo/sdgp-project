import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true }, // New field
  notes: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;