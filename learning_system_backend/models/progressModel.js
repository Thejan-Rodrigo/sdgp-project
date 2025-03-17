// models/progressModel.js
import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  notes: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Progress", progressSchema);
