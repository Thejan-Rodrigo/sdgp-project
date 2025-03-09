// models/studentModel.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  role: { type: String, default: "student" }, // Always "student"
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  schoolId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "School" }, // Link to school
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" } // Link to parent
});

const Student = mongoose.model("Student", studentSchema);
export default Student;