import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  subject: String,
  remarks: String,
  date: Date,
});

export default mongoose.model("Progress", progressSchema);
