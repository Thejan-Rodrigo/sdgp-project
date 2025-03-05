import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

const createAdmin = async ({ firstName, lastName, email, password, schoolId }) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "User with this email already exists");

  // Create new admin
  const admin = new User({
    firstName,
    lastName,
    email,
    password,
    schoolId,
    role: "admin",
  });

  await admin.save();
  return admin;
};

export default { createAdmin };
