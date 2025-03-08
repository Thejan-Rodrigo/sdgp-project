import School from "../models/School.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import ApiError from "../utils/ApiError.js"; // Custom error handling
import logger from "../utils/logger.js"

const createSchoolWithAdmin = async ({
  schoolName,
  schoolAddress,
  district,
  province,
  firstName,
  lastName,
  dateOfBirth,
  phone,
  email,
  adminAddress,
  password,
}) => {
  // Check if email is already registered
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    logger.error("[schoolService] Admin with this email already exists")
    throw new ApiError(400, "Admin with this email already exists");
  }

  logger.info("[schoolService] Not admin found and creating a new school")

  // Create new school entry
  const school = new School({
    schoolName,
    schoolAddress,
    district,
    province,
  });

  await school.save(); // Save school to DB
  logger.info("[schoolService] New school created and save in databse")

  // Hash password before saving admin
  //const hashedPassword = await bcrypt.hash(password, 10);

  // Create admin user linked to the school
  const admin = new User({
    schoolId: school._id,
    firstName,
    lastName,
    email,
    password,
    role: "admin",
    isActive: true,
    phone,
    address: adminAddress,
    dateOfBirth,
  });

  await admin.save(); // Save admin to DB

  logger.info("[schoolService] New admin created and save in databse")

  return { school, admin };
};

export default { createSchoolWithAdmin };
