import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ApiError from "../utils/ApiError.js"; // Import error handling class
import logger from '../utils/logger.js'; // Import the logger

dotenv.config();


const createUser = async ({ firstName, lastName, email, password, role, schoolId }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  // Ensure that only non-super admins have a schoolId
  if (role !== "superadmin" && !schoolId) {
    throw new Error("School ID is required for non-superadmin roles");
  }

  const user = new User({ firstName, lastName, email, password, role, schoolId: role === "superadmin" ? null : schoolId });
  await user.save();

  return user;
};

const createTeacher = async ({ firstName, lastName, dateOfBirth, email, phone, address, password, schoolId }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const teacher = new User({ 
    role: "teacher", 
    firstName, 
    lastName, 
    dateOfBirth, 
    email, 
    phone, 
    address, 
    password,  // ✅ Include password
    schoolId   // ✅ Include schoolId
  });

  await teacher.save();
  return teacher;
};


/*const createStudentAndParent = async ({ studentFirstName, studentLastName, dateOfBirth, phone, address, parentFirstName, parentLastName, parentEmail }) => {
  const existingParent = await User.findOne({ email: parentEmail });
  if (existingParent) throw new Error("Parent already exists");

  const student = new Student({ firstName: studentFirstName, lastName: studentLastName, dateOfBirth, phone, address });
  await student.save();

  const parent = new User({ role: "parent", firstName: parentFirstName, lastName: parentLastName, email: parentEmail, phone, address, student: student._id });
  await parent.save();

  return { student, parent };
};*/

export const createStudentAndParent = async ({
  studentFirstName, studentLastName, dateOfBirth, phone, address, 
  parentFirstName, parentLastName, parentEmail
}) => {
  // Check if parent already exists
  const existingParent = await User.findOne({ email: parentEmail });
  if (existingParent) throw new Error("Parent already registered with this email");

  // Create Student
  const student = new User({
    role: 'student',
    firstName: studentFirstName,
    lastName: studentLastName,
    dateOfBirth,
    phone,
    address,
  });
  await student.save();

  // Create Parent
  const parent = new User({
    role: 'parent',
    firstName: parentFirstName,
    lastName: parentLastName,
    email: parentEmail,
    phone,
    address,
    student: student._id, // link to student
    studentFirstName: studentFirstName,
    studentLastName: studentLastName,
    parentFirstName: parentFirstName,
    parentLastName: parentLastName,
    parentEmail: parentEmail,
  });
  await parent.save();

  return { student, parent };
};


const loginWithEmailAndPassword = async (email, password) => {
  //console.log(user.password)
  console.log(password)
  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, "Invalid email or password");


  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(401, "Invalid email or password");
  logger.info("[authService] Passwords match!")

  // Update last login time
  user.lastLogin = new Date();
  await user.save();

  logger.info("[authService] Login successfull!")

  return user;
};

const generateAuthToken = (user) => {
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
};

export default { createUser, loginWithEmailAndPassword, generateAuthToken, createTeacher };
