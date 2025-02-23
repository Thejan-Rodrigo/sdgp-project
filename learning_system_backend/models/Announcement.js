import { Schema, model } from "mongoose";
import status from "../config/constants.js";

const announcementSchema = new Schema(
  {
    schoolId: {
      type: Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author ID is required"],
    },
    targetAudience: [
      {
        type: String,
        enum: Object.values(status.targetAudience),
        required: [true, "Target audience is required"],
      },
    ],
    status: {
      type: String,
      enum: Object.values(status.announcementStatus),
      default: status.announcementStatus.DRAFT,
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
announcementSchema.index({ schoolId: 1, createdAt: -1 });
announcementSchema.index({ schoolId: 1, status: 1 });

// Virtual for getting read count
announcementSchema.virtual("readCount", {
  ref: "AnnouncementRead",
  localField: "_id",
  foreignField: "announcementId",
  count: true,
});

export default model("Announcement", announcementSchema);
