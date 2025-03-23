import { Types } from "mongoose";
import Announcement from "../models/Announcement.js"; 
import AnnouncementRead from "../models/AnnouncementRead.js"; 
import ApiError from "../utils/ApiError.js"; 
import status from "../config/constants.js";
import logger from "../config/logger.js"; 

const announcementService = {
  // Create new announcement
  async createAnnouncement(announcementData) {
    try {
      const announcement = new Announcement(announcementData); // Create a new announcement instance
      await announcement.populate("authorId", "firstName lastName"); 
      await announcement.save(); // Save the announcement to the database

      logger.info(`New announcement created with ID: ${announcement._id}`); 
      return announcement; 
    } catch (error) {
      logger.error("Error creating announcement:", error); 
      throw new ApiError(status.statusCodes.INTERNAL_SERVER, "Error creating announcement"); // Throw custom error
    }
  },

  // Get all announcements with filters and pagination
  async getAnnouncements(params) {
    try {
      const { schoolId, page = 1, limit = 10, status, search, startDate, endDate } = params;
      const query = { schoolId }; // Base query with schoolId
      if (status) query.status = status; // Add status filter if provided

      // Date range filtering
      if (startDate || endDate) {
        query.createdAt = {};
        if (startDate) query.createdAt.$gte = new Date(startDate); // Greater than or equal to start date
        if (endDate) query.createdAt.$lte = new Date(endDate); // Less than or equal to end date
      }

      // Search functionality (title or content)
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } }, // Case-insensitive title search
          { content: { $regex: search, $options: "i" } }, // Case-insensitive content search
        ];
      }

      const skip = (parseInt(page) - 1) * parseInt(limit); // Calculate skip value for pagination
      const [announcements, total] = await Promise.all([
        Announcement.find(query)
          .populate("authorId", "firstName lastName")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(parseInt(limit)), 
        Announcement.countDocuments(query), 
      ]);

      return {
        announcements,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)), // Calculate total pages
        },
      };
    } catch (error) {
      logger.error("Error getting announcements:", error); // Log error
      throw new ApiError(status.statusCodes.INTERNAL_SERVER, "Error retrieving announcements"); // Throw custom error
    }
  },

  // Get single announcement by ID
  async getAnnouncementById(id, schoolId) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new ApiError(status.statusCodes.BAD_REQUEST, "Invalid announcement ID"); // Validate ObjectId
      }

      const announcement = await Announcement.findOne({ _id: id, schoolId }).populate("authorId", "firstName lastName");

      if (!announcement) {
        throw new ApiError(status.statusCodes.NOT_FOUND, "Announcement not found"); // Throw error if not found
      }

      const readCount = await AnnouncementRead.countDocuments({ announcementId: id, schoolId }); // Get read count

      const announcementObj = announcement.toObject(); // Convert Mongoose document to plain object
      announcementObj.readCount = readCount; // Add read count to the announcement object

      return announcementObj;
    } catch (error) {
      logger.error(`Error getting announcement ${id}:`, error); // Log error
      if (error instanceof ApiError) throw error; // Re-throw custom errors
      throw new ApiError(status.statusCodes.INTERNAL_SERVER, "Error retrieving announcement"); // Throw custom error
    }
  },

  // Update announcement
  async updateAnnouncement(id, schoolId, updateData) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new ApiError(status.statusCodes.BAD_REQUEST, "Invalid announcement ID"); // Validate ObjectId
      }

      const announcement = await Announcement.findOneAndUpdate(
        { _id: id, schoolId }, // Find announcement by ID and schoolId
        updateData, // Update data
        { new: true, runValidators: true } // Return updated document and run validators
      ).populate("authorId", "firstName lastName");

      if (!announcement) {
        throw new ApiError(status.statusCodes.NOT_FOUND, "Announcement not found"); // Throw error if not found
      }

      logger.info(`Announcement ${id} updated successfully`); // Log success
      return announcement;
    } catch (error) {
      logger.error(`Error updating announcement ${id}:`, error); // Log error
      if (error instanceof ApiError) throw error; // Re-throw custom errors
      throw new ApiError(status.statusCodes.INTERNAL_SERVER, "Error updating announcement"); // Throw custom error
    }
  },

  // Delete announcement
  async deleteAnnouncement(id, schoolId) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new ApiError(status.statusCodes.BAD_REQUEST, "Invalid announcement ID"); // Validate ObjectId
      }

      const announcement = await Announcement.findOneAndDelete({ _id: id, schoolId }); // Find and delete announcement

      if (!announcement) {
        throw new ApiError(status.statusCodes.NOT_FOUND, "Announcement not found"); // Throw error if not found
      }

      await AnnouncementRead.deleteMany({ announcementId: id }); // Delete associated read records

      logger.info(`Announcement ${id} deleted successfully`); 
      return true;
    } catch (error) {
      logger.error(`Error deleting announcement ${id}:`, error); 
      if (error instanceof ApiError) throw error; // Re-throw custom errors
      throw new ApiError(status.statusCodes.INTERNAL_SERVER, "Error deleting announcement"); // Throw custom error
    }
  },

  // Mark announcement as read
  async markAsRead({ announcementId, schoolId, userId }) {
    try {
      if (!Types.ObjectId.isValid(announcementId)) {
        throw new ApiError(status.statusCodes.BAD_REQUEST, "Invalid announcement ID"); // Validate ObjectId
      }

      const announcement = await Announcement.findOne({ _id: announcementId, schoolId }); // Find announcement

      if (!announcement) {
        throw new ApiError(status.statusCodes.NOT_FOUND, "Announcement not found"); // Throw error if not found
      }

      const readStatus = await AnnouncementRead.findOneAndUpdate(
        { announcementId, schoolId, userId }, // Find or create read record
        { $setOnInsert: { readAt: new Date() } }, // Set readAt timestamp on insert
        { upsert: true, new: true } // Upsert and return updated document
      );

      logger.info(`Announcement ${announcementId} marked as read by user ${userId}`); 
      return readStatus;
    } catch (error) {
      logger.error(`Error marking announcement ${announcementId} as read:`, error); 
      if (error instanceof ApiError) throw error; // Re-throw custom errors
      throw new ApiError(status.statusCodes.INTERNAL_SERVER, "Error marking announcement as read"); // Throw custom error
    }
  },

  // Get read status for an announcement
  async getReadStatus({ announcementId, schoolId }) {
    try {
      if (!Types.ObjectId.isValid(announcementId)) {
        throw new ApiError(status.statusCodes.BAD_REQUEST, "Invalid announcement ID"); // Validate ObjectId
      }

      const announcement = await Announcement.findOne({ _id: announcementId, schoolId }); // Find announcement

      if (!announcement) {
        throw new ApiError(status.statusCodes.NOT_FOUND, "Announcement not found"); // Throw error if not found
      }

      const readReceipts = await AnnouncementRead.find({ announcementId, schoolId })
        .populate("userId", "firstName lastName role") // Populate user details
        .sort({ readAt: -1 }); // Sort by readAt timestamp (newest first)

      return {
        total: readReceipts.length, // Total number of readers
        readers: readReceipts.map((receipt) => ({
          user: receipt.userId, // User details
          readAt: receipt.readAt, // Read timestamp
        })),
      };
    } catch (error) {
      logger.error(`Error getting read status for announcement ${announcementId}:`, error);
      if (error instanceof ApiError) throw error; // Re-throw custom errors
      throw new ApiError(status.statusCodes.INTERNAL_SERVER, "Error getting read status");
    }
  },
};

export default announcementService;