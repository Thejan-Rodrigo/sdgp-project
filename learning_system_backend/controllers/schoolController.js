import catchAsync from "../utils/catchAsync.js";
import { successResponse } from "../utils/responseHandler.js";
import schoolService from "../services/schoolService.js";
import logger from "../utils/logger.js";

const schoolController = {
  createSchool: catchAsync(async (req, res) => {
    const schoolData = req.body;
    logger.info("[schoolController] Data came");
    const { school, admin } = await schoolService.createSchoolWithAdmin(schoolData);
    logger.info("[schoolController] School and admin created successfully");
    successResponse(res, { school, admin }, "School and admin created successfully", 201);
  }),

  getAllSchools: catchAsync(async (req, res) => {
    logger.info("[schoolController] Fetching all schools");
    const schools = await schoolService.getAllSchools();
    logger.info("[schoolController] Successfully fetched all schools");
    successResponse(res, { schools }, "All schools retrieved successfully");
  }),

  deleteSchoolById: catchAsync(async (req, res) => {
    const schoolId = req.params.id; // Get the school ID from the request parameters
    logger.info(`[schoolController] Deleting school with ID: ${schoolId}`);
    await schoolService.deleteSchoolById(schoolId);
    logger.info(`[schoolController] School with ID: ${schoolId} deleted successfully`);
    successResponse(res, null, "School deleted successfully");
  }),
};

export default schoolController;