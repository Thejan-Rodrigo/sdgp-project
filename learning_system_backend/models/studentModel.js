// models/studentModel.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true }
});

export default mongoose.model("Student", studentSchema);
