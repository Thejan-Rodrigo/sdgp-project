import School from "../models/School.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import ApiError from "../utils/ApiError.js"; // Custom error handling
import logger from "../utils/logger.js";

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
    logger.error("[schoolService] Admin with this email already exists");
    throw new ApiError(400, "Admin with this email already exists");
  }

  logger.info("[schoolService] Not admin found and creating a new school");

  // Create new school entry
  const school = new School({
    schoolName,
    schoolAddress,
    district,
    province,
  });

  await school.save();
  logger.info("[schoolService] New school created and saved in database");

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
  logger.info("[schoolService] New admin created and saved in database");

  return { school, admin };
};

// Function to get all schools
const getAllSchools = async () => {
  const schools = await School.find({});
  return schools;
};

// Function to delete a school by ID
const deleteSchoolById = async (schoolId) => {
  // Check if the school exists
  const school = await School.findById(schoolId);
  if (!school) {
    logger.error(`[schoolService] School with ID: ${schoolId} not found`);
    throw new ApiError(404, "School not found");
  }

  // Delete the school
  await School.findByIdAndDelete(schoolId);
  logger.info(`[schoolService] School with ID: ${schoolId} deleted successfully`);

  // Optionally, delete the associated admin user(s)
  await User.deleteMany({ schoolId });
  logger.info(`[schoolService] Associated admin users for school ID: ${schoolId} deleted successfully`);
};

export default { createSchoolWithAdmin, getAllSchools, deleteSchoolById };