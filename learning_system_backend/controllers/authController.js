// authController.js
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import { successResponse } from "../utils/responseHandler.js";
import authService from "../services/authService.js";
import logger from "../utils/logger.js";

const authController = {
  // Register user
  register: catchAsync(async (req, res) => {
    const { firstName, lastName, email, password, role, schoolId } = req.body;

    // Ensure super admin does not have a schoolId
    logger.debug(role);

    let user, token;

    if (role === "teacher") {
      user = await authService.createTeacher(req.body);
      token = authService.generateAuthToken(user);
    } else if (role === "student") {
      const { student, parent } = await authService.createStudentAndParent(req.body);
      token = authService.generateAuthToken(parent); // Parents log in
      return successResponse(res, 201, { student, parent, token }, "Registration successful");
    } else if (role === "superadmin") {
      if (role === "superadmin" && schoolId) {
        throw new ApiError(400, "Super admin should not be assigned to a school");
      }

      user = await authService.createUser({ firstName, lastName, email, password, role, schoolId });
      token = authService.generateAuthToken(user);
    } else {
      throw new Error("Invalid role");
    }

    successResponse(res, 201, { user, token }, "Registration successful");
  }),

  // Login user
  login: catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginWithEmailAndPassword(email, password);
    const token = authService.generateAuthToken(user);

    // Use successResponse correctly
    successResponse(res, 200, { user, token }, "Login successful");
  }),

  // Get user profile
  getProfile: catchAsync(async (req, res) => {
    successResponse(res, 200, { user: req.user }, "Profile retrieved successfully");
  }),

  // Get all users by school ID
  getUsersBySchoolId: catchAsync(async (req, res) => {
    const { schoolId } = req.params;

    if (!schoolId) {
      throw new ApiError(400, "School ID is required");
    }

    const users = await authService.getUsersBySchoolId(schoolId);
    successResponse(res, { users }, "Users retrieved successfully");
  }),

  // Delete teacher by ID
  deleteTeacherById: catchAsync(async (req, res) => {
    const { teacherId } = req.params;

    if (!teacherId) {
      throw new ApiError(400, "Teacher ID is required");
    }

    await authService.deleteTeacherById(teacherId);
    successResponse(res, null, "Teacher deleted successfully", 204);
  }),

  // Delete parent and student by parent ID
  deleteParentAndStudentById: catchAsync(async (req, res) => {
    const { parentId } = req.params;

    if (!parentId) {
      throw new ApiError(400, "Parent ID is required");
    }

    await authService.deleteParentAndStudentById(parentId);
    successResponse(res, null, "Parent and associated student deleted successfully", 204);
  }),
};

export default authController;