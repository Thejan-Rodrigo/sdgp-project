import mongoose from "mongoose";

// Student Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
  email: { type: String, required: true, unique: true },
  grade: { type: String, required: true },
});

// Message Schema
const messageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

// ✅ Correct Exports
export const Message = mongoose.model("Message", messageSchema);
export const Student = mongoose.model("Student", studentSchema);
