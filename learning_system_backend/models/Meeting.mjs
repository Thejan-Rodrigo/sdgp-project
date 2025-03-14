import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: Date, required: true },
  link: { type: String, required: true },
  schoolId: { type: mongoose.Schema.Types.ObjectId, required: true } // Add schoolId field
}, { timestamps: true });

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;