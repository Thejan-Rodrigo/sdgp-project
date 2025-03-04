import catchAsync from "../utils/catchAsync.js";
import { successResponse } from "../utils/responseHandler.js";
import adminService from "../services/adminService.js";

const adminController = {
  addAdmin: catchAsync(async (req, res) => {
    const { firstName, lastName, email, password, schoolId } = req.body;

    // Call service to create the admin
    const admin = await adminService.createAdmin({
      firstName,
      lastName,
      email,
      password,
      schoolId,
    });

    successResponse(res, { admin }, "Admin added successfully", 201);
  }),
};

export default adminController;
