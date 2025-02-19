import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const announcementReadSchema = new Schema(
  {
    schoolId: {
      type: Schema.Types.ObjectId,
      ref: 'School',
      required: [true, 'School ID is required'],
    },
    announcementId: {
      type: Schema.Types.ObjectId,
      ref: 'Announcement',
      required: [true, 'Announcement ID is required'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    readAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index to prevent duplicate reads
announcementReadSchema.index(
  { schoolId: 1, announcementId: 1, userId: 1 },
  { unique: true }
);

const AnnouncementRead = model('AnnouncementRead', announcementReadSchema);

export default AnnouncementRead;
