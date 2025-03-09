import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import logger from "../utils/logger.js";

const createAdmin = async ({ firstName, lastName, email, password, schoolId }) => {
  // Check if user already exists
  logger.info("[createAdmin] searching a user")
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "User with this email already exists");
  logger.info("[createAdmin] user not found. Creating a new user")
  // Create new admin
  const admin = new User({
    firstName,
    lastName,
    email,
    password,
    schoolId,
    role: "admin",
  });
  logger.info("[createAdmin] user created successfully")

  await admin.save();
  logger.info("[createAdmin] user save in the database successfully")
  return admin;
};

export default { createAdmin };
