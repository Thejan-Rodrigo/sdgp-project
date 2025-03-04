// models/Progress.mjs
import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    notes: String,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Progress", ProgressSchema);