import mongoose from 'mongoose';

const { Schema, model } = mongoose; // Destructure Schema and model from mongoose

// Define the schema for AnnouncementRead
const announcementReadSchema = new Schema(
  {
    schoolId: {
      type: Schema.Types.ObjectId, // Reference to the School model
      ref: 'School', 
      required: [true, 'School ID is required'], // School ID is mandatory
    },
    announcementId: {
      type: Schema.Types.ObjectId, 
      ref: 'Announcement', 
      required: [true, 'Announcement ID is required'], // Announcement ID is mandatory
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Establish a reference to the User collection
      required: [true, 'User ID is required'], // User ID is mandatory
    },
    readAt: {
      type: Date, // Timestamp for when the announcement was read
      default: Date.now, // Default to the current date and time
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Compound unique index to prevent duplicate reads
announcementReadSchema.index(
  { schoolId: 1, announcementId: 1, userId: 1 }, // Index on schoolId, announcementId, and userId
  { unique: true } // Ensure the combination of these fields is unique
);

// Create the Mongoose model for AnnouncementRead
const AnnouncementRead = model('AnnouncementRead', announcementReadSchema);

export default AnnouncementRead;