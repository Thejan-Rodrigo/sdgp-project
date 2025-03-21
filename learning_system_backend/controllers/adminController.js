// controllers/adminController.js
import catchAsync from "../utils/catchAsync.js";
import { successResponse } from "../utils/responseHandler.js";
import adminService from "../services/adminService.js";
import logger from "../utils/logger.js";

const adminController = {
  addAdmin: catchAsync(async (req, res, next) => {
    try {
      logger.debug("[adminController] Received admin creation request");

      const { firstName, lastName, email, password, schoolId } = req.body;

      console.log("Received data:");
      console.log({ firstName, lastName, email, password, schoolId });

      // Call service to create the admin
      const admin = await adminService.createAdmin({
        firstName,
        lastName,
        email,
        password,
        schoolId,
      });

      // Use successResponse correctly
      successResponse(res, 201, { admin }, "Admin added successfully");
    } catch (error) {
      logger.error("[adminController] Error creating admin:", error);
      next(error); // Pass error to the middleware for handling
    }
  }),

  getAdminsBySchoolId: catchAsync(async (req, res, next) => {
    try {
      const { schoolId } = req.params; // Extract schoolId from the URL parameters
      logger.debug(`[adminController] Fetching admins for schoolId: ${schoolId}`);

      // Call service to get admins by school ID
      const admins = await adminService.getAdminsBySchoolId(schoolId);

      // Use successResponse correctly
      successResponse(res, 200, { admins }, "Admins fetched successfully");
    } catch (error) {
      logger.error("[adminController] Error fetching admins:", error);
      next(error); // Pass error to the middleware for handling
    }
  }),

  deleteAdminById: catchAsync(async (req, res, next) => {
    try {
      const { adminId } = req.params; // Extract adminId from the URL parameters
      logger.debug(`[adminController] Deleting admin with ID: ${adminId}`);

      // Call service to delete the admin by ID
      await adminService.deleteAdminById(adminId);

      // Use successResponse correctly
      successResponse(res, 204, null, "Admin deleted successfully");
    } catch (error) {
      logger.error("[adminController] Error deleting admin:", error);
      next(error); // Pass error to the middleware for handling
    }
  }),
};

export default adminController;