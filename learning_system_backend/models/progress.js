import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference the User model
  notes: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;