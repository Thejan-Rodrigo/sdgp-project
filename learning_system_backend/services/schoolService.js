import School from "../models/School.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import ApiError from "../utils/ApiError.js"; // Custom error handling

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
    throw new ApiError(400, "Admin with this email already exists");
  }

  // Create new school entry
  const school = new School({
    schoolName,
    schoolAddress,
    district,
    province,
  });

  await school.save(); // Save school to DB

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

  return { school, admin };
};

export default { createSchoolWithAdmin };
