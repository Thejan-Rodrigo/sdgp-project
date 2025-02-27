import { catchAsync } from "../utils/catchAsync.js"; // Use curly braces for named export
import { ApiError } from "../utils/ApiError.js"; // Use curly braces for named export
import { successResponse } from "../utils/responseHandler.js"; // Use curly braces for named export
import authService from "../services/authService.js";
import logger from "../utils/logger.js";

const authController = {


  // Register user
  register: catchAsync(async (req, res) => {
    const { firstName, lastName, email, password, role, schoolId } = req.body;

    // Ensure super admin does not have a schoolId

    logger.debug(role)

    let user, token;

    if (role === "teacher") {
      user = await authService.createTeacher(req.body);
      token = authService.generateAuthToken(user);
    } else if (role === "student") {
      const { student, parent } = await authService.createStudentAndParent(req.body);
      token = authService.generateAuthToken(parent); // Parents log in
      return successResponse(res, { student, parent, token }, "Registration successful", 201);
    } else if (role ==="superadmin"){
      if (role === "superadmin" && schoolId) {
        throw new ApiError(400, "Super admin should not be assigned to a school");
      }
  
      const user = await authService.createUser({ firstName, lastName, email, password, role, schoolId });
      const token = authService.generateAuthToken(user);
    } else {
      throw new Error("Invalid role");
    }

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
    successResponse(res, { user: req.user });
  }),
};

export default authController;
