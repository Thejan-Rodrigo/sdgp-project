import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import { successResponse } from "../utils/responceHandeller.js";
import announcementService from "../services/announcementService.js";
import status from "../config/constants.js";
import logger from "../config/logger.js";
import mongoose from "mongoose";

const announcementController = {
  // Create announcement
  createAnnouncement: catchAsync(async (req, res) => {
    try {
      const { title, content, targetAudience } = req.body;
      if (!title || !content || !targetAudience) {
        throw new ApiError(status.statusCodes.BAD_REQUEST, "Missing required fields");
      }

      const announcement = await announcementService.createAnnouncement({
        ...req.body,
        schoolId: req.user.schoolId,
        authorId: req.user._id,
      });

      return successResponse(
        res,
        { announcement },
        "Announcement created successfully",
        status.statusCodes.CREATED
      );
    } catch (error) {
      logger.error("Error creating announcement:", error);
      throw error;
    }
  }),

  // Get all announcements
  getAnnouncements: catchAsync(async (req, res) => {
    try {
      console.log("hello");
      const {
        page = 1,
        limit = 10,
        status,
        targetAudience,
        search,
      } = req.query;

      const filters = {
        schoolId: req.user.schoolId,
        page: parseInt(page),
        limit: parseInt(limit),
        status,
        targetAudience,
        search,
      };

      const result = await announcementService.getAnnouncements(filters);
      return successResponse(res, result);
    } catch (error) {
      logger.error("Error getting announcements:", error);
      throw error;
    }
  }),

  // Get single announcement
  getAnnouncement: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(
          status.statusCodes.BAD_REQUEST,
          "Invalid announcement ID format"
        );
      }

      const announcement = await announcementService.getAnnouncementById(
        id,
        req.user.schoolId
      );

      if (!announcement) {
        throw new ApiError(status.statusCodes.NOT_FOUND, "Announcement not found");
      }

      return successResponse(res, { announcement });
    } catch (error) {
      logger.error("Error in getAnnouncement:", error);
      throw error;
    }
  }),

  // Update announcement
  updateAnnouncement: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ApiError(
          status.statusCodes.BAD_REQUEST,
          "Announcement ID is required"
        );
      }

      const exists = await announcementService.getAnnouncementById(
        id,
        req.user.schoolId
      );
      if (!exists) {
        throw new ApiError(status.statusCodes.NOT_FOUND, "Announcement not found");
      }

      const announcement = await announcementService.updateAnnouncement(
        id,
        req.user.schoolId,
        req.body
      );

      return successResponse(
        res,
        { announcement },
        "Announcement updated successfully"
      );
    } catch (error) {
      logger.error("Error updating announcement:", error);
      throw error;
    }
  }),

  // Delete announcement
  deleteAnnouncement: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ApiError(
          status.statusCodes.BAD_REQUEST,
          "Announcement ID is required"
        );
      }

      const exists = await announcementService.getAnnouncementById(
        id,
        req.user.schoolId
      );
      if (!exists) {
        throw new ApiError(status.statusCodes.NOT_FOUND, "Announcement not found");
      }

      await announcementService.deleteAnnouncement(id, req.user.schoolId);
      return successResponse(res, null, "Announcement deleted successfully");
    } catch (error) {
      logger.error("Error deleting announcement:", error);
      throw error;
    }
  }),

  // Mark as read
  markAsRead: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ApiError(
          status.statusCodes.BAD_REQUEST,
          "Announcement ID is required"
        );
      }

      const exists = await announcementService.getAnnouncementById(
        id,
        req.user.schoolId
      );
      if (!exists) {
        throw new ApiError(status.statusCodes.NOT_FOUND, "Announcement not found");
      }

      await announcementService.markAsRead({
        announcementId: id,
        schoolId: req.user.schoolId,
        userId: req.user._id,
      });

      return successResponse(res, null, "Announcement marked as read");
    } catch (error) {
      logger.error("Error marking announcement as read:", error);
      throw error;
    }
  }),

  // Get read status
  getReadStatus: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ApiError(
          status.statusCodes.BAD_REQUEST,
          "Announcement ID is required"
        );
      }

      const exists = await announcementService.getAnnouncementById(
        id,
        req.user.schoolId
      );
      if (!exists) {
        throw new ApiError(status.statusCodes.NOT_FOUND, "Announcement not found");
      }

      const status = await announcementService.getReadStatus({
        announcementId: id,
        schoolId: req.user.schoolId,
      });

      return successResponse(res, { status });
    } catch (error) {
      logger.error("Error getting read status:", error);
      throw error;
    }
  }),

  // Get announcement stats
  getAnnouncementStats: catchAsync(async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      if (startDate && !Date.parse(startDate)) {
        throw new ApiError(status.statusCodes.BAD_REQUEST, "Invalid start date");
      }
      if (endDate && !Date.parse(endDate)) {
        throw new ApiError(status.statusCodes.BAD_REQUEST, "Invalid end date");
      }

      const stats = await announcementService.getAnnouncementStats(
        req.user.schoolId,
        { startDate, endDate }
      );

      return successResponse(res, { stats });
    } catch (error) {
      logger.error("Error getting announcement stats:", error);
      throw error;
    }
  }),
};

export default announcementController;
