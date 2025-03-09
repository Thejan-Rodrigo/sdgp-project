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

      successResponse(res, { admin }, "Admin added successfully", 201);
    } catch (error) {
      logger.error("[adminController] Error creating admin:", error);
      next(error); // Pass error to the middleware for handling
    }
  }),
};


export default adminController;
