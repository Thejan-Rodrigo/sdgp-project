import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema(
  {
    schoolName: { type: String, required: true, trim: true },
    schoolAddress: { type: String, required: true },
    district: { type: String, required: true },
    province: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

const School = mongoose.model("School", schoolSchema);
export default School;
