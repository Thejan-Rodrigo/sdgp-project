import { Schema, model } from "mongoose";
import status from "../config/constants.js"; 

// Define the schema for Announcement
const announcementSchema = new Schema(
  {
    schoolId: {
      type: Schema.Types.ObjectId, // Reference to the School model
      ref: "School", // Establish a reference to the School collection
      required: [false, "School ID is required"], // School ID is optional
    },
    title: {
      type: String,
      required: [true, "Title is required"], // Title is mandatory
      trim: true, // Automatically trim whitespace
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [200, "Title cannot exceed 200 characters"], 
    },
    content: {
      type: String,
      required: [true, "Content is required"], 
      trim: true, 
      maxlength: [5000, "Content cannot exceed 5000 characters"], 
    },
    authorId: {
      type: Schema.Types.ObjectId, // Reference to the User model
      ref: "User", 
      required: [true, "Author ID is required"], 
    },
    targetAudience: [
      {
        type: String,
        enum: Object.values(status.targetAudience), // Restrict values to those defined in constants
        required: [true, "Target audience is required"], 
      },
    ],
    status: {
      type: String,
      enum: Object.values(status.announcementStatus), // Restrict values to those defined in constants
      default: status.announcementStatus.DRAFT, // Default status is "DRAFT"
    },
    publishedAt: {
      type: Date, 
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
    toJSON: { virtuals: true }, // Include virtual fields when converting to JSON
    toObject: { virtuals: true }, // Include virtual fields when converting to plain objects
  }
);

// Indexes for better query performance
announcementSchema.index({ schoolId: 1, createdAt: -1 }); // Index for sorting by schoolId and createdAt (descending)
announcementSchema.index({ schoolId: 1, status: 1 }); // Index for filtering by schoolId and status

// Virtual field for getting the read count of the announcement
announcementSchema.virtual("readCount", {
  ref: "AnnouncementRead", 
  localField: "_id",
  foreignField: "announcementId", 
  count: true,
});

// Create the Mongoose model for Announcement
export default model("Announcement", announcementSchema);