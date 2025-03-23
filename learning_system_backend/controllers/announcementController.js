import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js"; 
import { successResponse } from "../utils/responceHandeller.js";
import announcementService from "../services/announcementService.js";
import status from "../config/constants.js"; 
import logger from "../config/logger.js"; 
import mongoose from "mongoose";

const announcementController = {
  // Create a new announcement
  createAnnouncement: catchAsync(async (req, res) => {
    try {
      const { title, content, targetAudience } = req.body;

      // Validate required fields
      if (!title || !content || !targetAudience) {
        throw new ApiError(status.statusCodes.BAD_REQUEST, "Missing required fields");
      }

      // Create announcement using the service layer
      const announcement = await announcementService.createAnnouncement({
        ...req.body, // Spread all fields from the request body
        schoolId: req.user.schoolId, // Add schoolId from the authenticated user
        authorId: req.user._id, // Add authorId from the authenticated user
      });

      // Send success response with the created announcement
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

  // Get all announcements with filters and pagination
  getAnnouncements: catchAsync(async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        targetAudience,
        search,
      } = req.query;

      // Prepare filters for the service layer
      const filters = {
        schoolId: req.user.schoolId, // Filter by the user's schoolId
        page: parseInt(page), // Convert page to a number
        limit: parseInt(limit), 
        status,
        targetAudience,
        search,
      };

      // Fetch announcements using the service layer
      const result = await announcementService.getAnnouncements(filters);

      // Send success response with the fetched announcements
      return successResponse(res, result);
    } catch (error) {
      logger.error("Error getting announcements:", error);
      throw error;
    }
  }),

  // Get a single announcement by ID
  getAnnouncement: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;

      // Validate the announcement ID format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(
          status.statusCodes.BAD_REQUEST,
          "Invalid announcement ID format"
        );
      }

      // Fetch the announcement using the service layer
      const announcement = await announcementService.getAnnouncementById(
        id,
        req.user.schoolId // Filter by the user's schoolId
      );

      // Check if the announcement exists
      if (!announcement) {
        throw new ApiError(status.statusCodes.NOT_FOUND, "Announcement not found");
      }

      // Send success response with the fetched announcement
      return successResponse(res, { announcement });
    } catch (error) {
      logger.error("Error in getAnnouncement:", error); 
      throw error;
    }
  }),

  // Update an announcement
  updateAnnouncement: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;

      // Validate the announcement ID
      if (!id) {
        throw new ApiError(
          status.statusCodes.BAD_REQUEST,
          "Announcement ID is required"
        );
      }

      // Check if the announcement exists
      const exists = await announcementService.getAnnouncementById(
        id,
        req.user.schoolId // Filter by the user's schoolId
      );
      if (!exists) {
        throw new ApiError(status.statusCodes.NOT_FOUND, "Announcement not found");
      }

      // Update the announcement using the service layer
      const announcement = await announcementService.updateAnnouncement(
        id,
        req.user.schoolId,
        req.body // Updated data from the request body
      );

      // Send success response with the updated announcement
      return successResponse(
        res,
        { announcement },
        "Announcement updated successfully"
      );
    } catch (error) {
      logger.error("Error updating announcement:", error); 
      throw error; // Re-throw the error to be handled by the global error handler
    }
  }),

  // Delete an announcement
  deleteAnnouncement: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;

      // Validate the announcement ID
      if (!id) {
        throw new ApiError(
          status.statusCodes.BAD_REQUEST,
          "Announcement ID is required"
        );
      }

      // Check if the announcement exists
      const exists = await announcementService.getAnnouncementById(
        id,
        req.user.schoolId // Filter by the user's schoolId
      );
      if (!exists) {
        throw new ApiError(status.statusCodes.NOT_FOUND, "Announcement not found");
      }

      // Delete the announcement using the service layer
      await announcementService.deleteAnnouncement(id, req.user.schoolId);

      // Send success response
      return successResponse(res, null, "Announcement deleted successfully");
    } catch (error) {
      logger.error("Error deleting announcement:", error); 
      throw error; // Re-throw the error to be handled by the global error handler
    }
  }),

  // Mark an announcement as read
  markAsRead: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;

      // Validate the announcement ID
      if (!id) {
        throw new ApiError(
          status.statusCodes.BAD_REQUEST,
          "Announcement ID is required"
        );
      }

      // Check if the announcement exists
      const exists = await announcementService.getAnnouncementById(
        id,
        req.user.schoolId // Filter by the user's schoolId
      );
      if (!exists) {
        throw new ApiError(status.statusCodes.NOT_FOUND, "Announcement not found");
      }

      // Mark the announcement as read using the service layer
      await announcementService.markAsRead({
        announcementId: id,
        schoolId: req.user.schoolId,
        userId: req.user._id, // Use the authenticated user's ID
      });

      // Send success response
      return successResponse(res, null, "Announcement marked as read");
    } catch (error) {
      logger.error("Error marking announcement as read:", error); 
      throw error; 
    }
  }),

  // Get the read status of an announcement
  getReadStatus: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;

      // Validate the announcement ID
      if (!id) {
        throw new ApiError(
          status.statusCodes.BAD_REQUEST,
          "Announcement ID is required"
        );
      }

      // Check if the announcement exists
      const exists = await announcementService.getAnnouncementById(
        id,
        req.user.schoolId // Filter by the user's schoolId
      );
      if (!exists) {
        throw new ApiError(status.statusCodes.NOT_FOUND, "Announcement not found");
      }

      // Fetch the read status using the service layer
      const status = await announcementService.getReadStatus({
        announcementId: id,
        schoolId: req.user.schoolId,
      });

      // Send success response with the read status
      return successResponse(res, { status });
    } catch (error) {
      logger.error("Error getting read status:", error); 
      throw error; 
    }
  }),

  // Get announcement statistics
  getAnnouncementStats: catchAsync(async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      // Validate the date formats
      if (startDate && !Date.parse(startDate)) {
        throw new ApiError(status.statusCodes.BAD_REQUEST, "Invalid start date");
      }
      if (endDate && !Date.parse(endDate)) {
        throw new ApiError(status.statusCodes.BAD_REQUEST, "Invalid end date");
      }

      // Fetch announcement statistics using the service layer
      const stats = await announcementService.getAnnouncementStats(
        req.user.schoolId, // Filter by the user's schoolId
        { startDate, endDate } // Date range for filtering
      );

      // Send success response with the statistics
      return successResponse(res, { stats });
    } catch (error) {
      logger.error("Error getting announcement stats:", error); 
      throw error; // Re-throw the error to be handled by the global error handler
    }
  }),
};

export default announcementController;