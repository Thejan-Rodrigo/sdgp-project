import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import logger from "../utils/logger.js";

const adminService = {
  createAdmin: async ({ firstName, lastName, email, password, schoolId }) => {
    // Check if user already exists
    logger.info("[createAdmin] searching a user");
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiError(400, "User with this email already exists");
    logger.info("[createAdmin] user not found. Creating a new user");

    // Create new admin
    const admin = new User({
      firstName,
      lastName,
      email,
      password,
      schoolId,
      role: "admin",
    });
    logger.info("[createAdmin] user created successfully");

    await admin.save();
    logger.info("[createAdmin] user saved in the database successfully");
    return admin;
  },

  getAdminsBySchoolId: async (schoolId) => {
    logger.info(`[getAdminsBySchoolId] Fetching admins for schoolId: ${schoolId}`);

    // Fetch users with role "admin" and matching schoolId
    const admins = await User.find({ schoolId, role: "admin" }).select(
      "-password -__v"
    ); // Exclude password and version key

    if (!admins || admins.length === 0) {
      logger.info(`[getAdminsBySchoolId] No admins found for schoolId: ${schoolId}`);
      throw new ApiError(404, "No admins found for this school");
    }

    logger.info(`[getAdminsBySchoolId] Admins fetched successfully`);
    return admins;
  },

  deleteAdminById: async (adminId) => {
    logger.info(`[deleteAdminById] Deleting admin with ID: ${adminId}`);

    // Find and delete the admin by ID
    const admin = await User.findByIdAndDelete(adminId);

    if (!admin) {
      logger.info(`[deleteAdminById] Admin not found with ID: ${adminId}`);
      throw new ApiError(404, "Admin not found");
    }

    logger.info(`[deleteAdminById] Admin deleted successfully`);
    return admin;
  },
};

export default adminService;