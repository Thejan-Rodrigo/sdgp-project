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
      const announcement = new Announcement(announcementData);
      await announcement.populate("authorId", "firstName lastName");
      await announcement.save();

      logger.info(`New announcement created with ID: ${announcement._id}`);
      return announcement;
    } catch (error) {
      logger.error("Error creating announcement:", error);
      throw new ApiError(status.statusCodes.INTERNAL_SERVER, "Error creating announcement");
    }
  },

  // Get all announcements with filters and pagination
  async getAnnouncements(params) {
    try {
      const { schoolId, page = 1, limit = 10, status, targetAudience, search, startDate, endDate } = params;
      const query = { schoolId };

      if (status) query.status = status;
      if (targetAudience) query.targetAudience = { $in: [targetAudience, "all"] };

      if (startDate || endDate) {
        query.createdAt = {};
        if (startDate) query.createdAt.$gte = new Date(startDate);
        if (endDate) query.createdAt.$lte = new Date(endDate);
      }

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
        ];
      }

      const skip = (parseInt(page) - 1) * parseInt(limit);

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
          pages: Math.ceil(total / parseInt(limit)),
        },
      };
    } catch (error) {
      logger.error("Error getting announcements:", error);
      throw new ApiError(status.statusCodes.INTERNAL_SERVER, "Error retrieving announcements");
    }
  },

  // Get single announcement
  async getAnnouncementById(id, schoolId) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new ApiError(status.statusCodes.BAD_REQUEST, "Invalid announcement ID");
      }

      const announcement = await Announcement.findOne({ _id: id, schoolId }).populate("authorId", "firstName lastName");

      if (!announcement) {
        throw new ApiError(status.statusCodes.NOT_FOUND, "Announcement not found");
      }

      const readCount = await AnnouncementRead.countDocuments({ announcementId: id, schoolId });

      const announcementObj = announcement.toObject();
      announcementObj.readCount = readCount;

      return announcementObj;
    } catch (error) {
      logger.error(`Error getting announcement ${id}:`, error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(status.statusCodes.INTERNAL_SERVER, "Error retrieving announcement");
    }
  },

  // Update announcement
  async updateAnnouncement(id, schoolId, updateData) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new ApiError(status.statusCodes.BAD_REQUEST, "Invalid announcement ID");
      }

      const announcement = await Announcement.findOneAndUpdate(
        { _id: id, schoolId },
        updateData,
        { new: true, runValidators: true }
      ).populate("authorId", "firstName lastName");

      if (!announcement) {
        throw new ApiError(status.statusCodes.NOT_FOUND, "Announcement not found");
      }

      logger.info(`Announcement ${id} updated successfully`);
      return announcement;
    } catch (error) {
      logger.error(`Error updating announcement ${id}:`, error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(status.statusCodes.INTERNAL_SERVER, "Error updating announcement");
    }
  },

  // Delete announcement
  async deleteAnnouncement(id, schoolId) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new ApiError(status.statusCodes.BAD_REQUEST, "Invalid announcement ID");
      }

      const announcement = await Announcement.findOneAndDelete({ _id: id, schoolId });

      if (!announcement) {
        throw new ApiError(status.statusCodes.NOT_FOUND, "Announcement not found");
      }

      await AnnouncementRead.deleteMany({ announcementId: id });

      logger.info(`Announcement ${id} deleted successfully`);
      return true;
    } catch (error) {
      logger.error(`Error deleting announcement ${id}:`, error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(status.statusCodes.INTERNAL_SERVER, "Error deleting announcement");
    }
  },

  // Mark announcement as read
  async markAsRead({ announcementId, schoolId, userId }) {
    try {
      if (!Types.ObjectId.isValid(announcementId)) {
        throw new ApiError(status.statusCodes.BAD_REQUEST, "Invalid announcement ID");
      }

      const announcement = await Announcement.findOne({ _id: announcementId, schoolId });

      if (!announcement) {
        throw new ApiError(status.statusCodes.NOT_FOUND, "Announcement not found");
      }

      const readStatus = await AnnouncementRead.findOneAndUpdate(
        { announcementId, schoolId, userId },
        { $setOnInsert: { readAt: new Date() } },
        { upsert: true, new: true }
      );

      logger.info(`Announcement ${announcementId} marked as read by user ${userId}`);
      return readStatus;
    } catch (error) {
      logger.error(`Error marking announcement ${announcementId} as read:`, error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(status.statusCodes.INTERNAL_SERVER, "Error marking announcement as read");
    }
  },

  // Get read status
  async getReadStatus({ announcementId, schoolId }) {
    try {
      if (!Types.ObjectId.isValid(announcementId)) {
        throw new ApiError(status.statusCodes.BAD_REQUEST, "Invalid announcement ID");
      }

      const announcement = await Announcement.findOne({ _id: announcementId, schoolId });

      if (!announcement) {
        throw new ApiError(status.statusCodes.NOT_FOUND, "Announcement not found");
      }

      const readReceipts = await AnnouncementRead.find({ announcementId, schoolId })
        .populate("userId", "firstName lastName role")
        .sort({ readAt: -1 });

      return {
        total: readReceipts.length,
        readers: readReceipts.map((receipt) => ({
          user: receipt.userId,
          readAt: receipt.readAt,
        })),
      };
    } catch (error) {
      logger.error(`Error getting read status for announcement ${announcementId}:`, error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(status.statusCodes.INTERNAL_SERVER, "Error getting read status");
    }
  },
};

export default announcementService;
