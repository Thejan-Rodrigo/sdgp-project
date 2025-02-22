import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import { successResponse } from "../utils/responceHandeller.js";
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
    successResponse(res, { user: req.user });
  }),
};

export default authController;
