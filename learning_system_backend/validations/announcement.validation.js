import { body, param, query } from "express-validator";
import mongoose from "mongoose";
import { announcementStatus, targetAudience } from "../config/constants.js";

const announcementValidation = {
  // Create announcement validation
  createAnnouncement: [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3, max: 100 })
      .withMessage("Title must be between 3 and 100 characters"),

    body("content")
      .trim()
      .notEmpty()
      .withMessage("Content is required")
      .isLength({ min: 10, max: 5000 })
      .withMessage("Content must be between 10 and 5000 characters"),

    body("targetAudience")
      .isArray()
      .withMessage("Target audience must be an array")
      .custom((value) => {
        if (!value.every((audience) => Object.values(targetAudience).includes(audience))) {
          throw new Error("Invalid target audience");
        }
        return true;
      }),

    body("status")
      .optional()
      .isIn(Object.values(announcementStatus))
      .withMessage("Invalid status"),
  ],

  // Get announcements validation
  getAnnouncements: [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive integer")
      .toInt(),

    query("limit")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("Limit must be between 1 and 100")
      .toInt(),

    query("status")
      .optional()
      .isIn(Object.values(announcementStatus))
      .withMessage("Invalid status"),

    query("targetAudience")
      .optional()
      .isIn(Object.values(targetAudience))
      .withMessage("Invalid target audience"),

    query("search")
      .optional()
      .trim()
      .isLength({ min: 1 })
      .withMessage("Search term cannot be empty"),

    query("startDate")
      .optional()
      .isISO8601()
      .withMessage("Invalid start date format"),

    query("endDate")
      .optional()
      .isISO8601()
      .withMessage("Invalid end date format")
      .custom((endDate, { req }) => {
        if (req.query.startDate && endDate) {
          const start = new Date(req.query.startDate);
          const end = new Date(endDate);
          if (end < start) {
            throw new Error("End date must be after start date");
          }
        }
        return true;
      }),
  ],

  // Get single announcement validation
  getAnnouncement: [
    param("id").custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid announcement ID format");
      }
      return true;
    }),
  ],

  // Update announcement validation
  updateAnnouncement: [
    param("id").custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid announcement ID");
      }
      return true;
    }),

    body("title")
      .optional()
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage("Title must be between 3 and 100 characters"),

    body("content")
      .optional()
      .trim()
      .isLength({ min: 10, max: 5000 })
      .withMessage("Content must be between 10 and 5000 characters"),

    body("targetAudience")
      .optional()
      .isArray()
      .withMessage("Target audience must be an array")
      .custom((value) => {
        if (!value.every((audience) => Object.values(targetAudience).includes(audience))) {
          throw new Error("Invalid target audience");
        }
        return true;
      }),

    body("status")
      .optional()
      .isIn(Object.values(announcementStatus))
      .withMessage("Invalid status"),
  ],

  // Delete announcement validation
  deleteAnnouncement: [
    param("id").custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid announcement ID");
      }
      return true;
    }),
  ],

  // Mark as read validation
  markAsRead: [
    param("id").custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid announcement ID");
      }
      return true;
    }),
  ],

  // Get read status validation
  getReadStatus: [
    param("id").custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid announcement ID");
      }
      return true;
    }),
  ],

  // Get stats validation
  getStats: [
    query("startDate")
      .optional()
      .isISO8601()
      .withMessage("Invalid start date format"),

    query("endDate")
      .optional()
      .isISO8601()
      .withMessage("Invalid end date format")
      .custom((endDate, { req }) => {
        if (req.query.startDate && endDate) {
          const start = new Date(req.query.startDate);
          const end = new Date(endDate);
          if (end < start) {
            throw new Error("End date must be after start date");
          }
        }
        return true;
      }),
  ],
};

export default announcementValidation;
