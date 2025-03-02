import catchAsync from "../utils/catchAsync.js";
import { successResponse } from "../utils/responseHandler.js";
import schoolService from "../services/schoolService.js";

const schoolController = {
  createSchool: catchAsync(async (req, res) => {
    const schoolData = req.body;
    const { school, admin } = await schoolService.createSchoolWithAdmin(schoolData);
    
    successResponse(res, { school, admin }, "School and admin created successfully", 201);
  }),
};

export default schoolController;
