import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import { successResponse } from "../utils/responseHandler.js";
import authService from "../services/authService.js";

const authController = {

  
  // Register user
  register: catchAsync(async (req, res) => {
    const { firstName, lastName, email, password, role, schoolId } = req.body;
    const user = await authService.createUser({ firstName, lastName, email, password, role, schoolId });
    const token = authService.generateAuthToken(user);

    successResponse(res, { user, token }, "Registration successful", 201);
  }),

  // Login user
  login: catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginWithEmailAndPassword(email, password);
    const token = authService.generateAuthToken(user);

    successResponse(res, { user, token }, "Login successful");
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
    successResponse(res, 200, { users }, "Users retrieved successfully");
  }),

  // Delete teacher by ID
  deleteTeacherById: catchAsync(async (req, res) => {
    const { teacherId } = req.params;

    if (!teacherId) {
      throw new ApiError(400, "Teacher ID is required");
    }

    await authService.deleteTeacherById(teacherId);
    successResponse(res, 204, null, "Teacher deleted successfully");
  }),

  // Delete parent and student by parent ID
  deleteParentAndStudentById: catchAsync(async (req, res) => {
    const { parentId } = req.params;

    if (!parentId) {
      throw new ApiError(400, "Parent ID is required");
    }

    await authService.deleteParentAndStudentById(parentId);
    successResponse(res, 204, null, "Parent and associated student deleted successfully");
  }),
};

export default authController;
