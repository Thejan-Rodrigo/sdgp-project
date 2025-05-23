import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ApiError from "../utils/ApiError.js"; // Import error handling class
import logger from '../utils/logger.js'; // Import the logger
import Student from "../models/Student.js";
import Parent from "../models/Parent.js";


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



const createStudentAndParent = async ({
  studentFirstName, studentLastName, dateOfBirth, phone, address, 
  parentFirstName, parentLastName, parentEmail, password, schoolId
}) => {
  // Check if parent already exists
  const existingParent = await User.findOne({ email: parentEmail });
  if (existingParent) throw new Error("Parent already registered with this email");

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create Student
  const student = new Student({
    firstName: studentFirstName,
    lastName: studentLastName,
    dateOfBirth,
    phone,
    address,
    schoolId
  });
  await student.save();

  // Create Parent (inside the User collection)
  const parent = new User({
    role: "parent",
    firstName: parentFirstName,
    lastName: parentLastName,
    email: parentEmail,
    phone,
    address,
    password,
    schoolId,
    student: student._id // Set student reference only for parents
  });

  await parent.save();

  // Optionally, set the parent reference in the Student document
  student.parent = parent._id;
  await student.save();

  return { student, parent };
};

/*export const createStudentAndParent = async ({
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
};*/


const loginWithEmailAndPassword = async (email, password) => {
  // Find user in the User collection
  let user = await User.findOne({ email });

  if (!user) {
    console.log("User not found in Users collection, checking Parents collection...");
    user = await Parent.findOne({ email });
    if (!user) {
      console.log("User not found in Parent collection either.");
      throw new ApiError(401, "Invalid email or password");
    }
  }

  console.log("User found:", user);
  

  console.log("Entered password:", password);
  console.log("Stored hashed password:", user.password);

  // Compare passwords

  // Compare plain text password with stored hashed password
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
    { _id: user._id, role: user.role, schoolId:user.schoolId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
};

const getUsersBySchoolId = async (schoolId) => {
  // Fetch teachers and parents from the User collection
  const teachersAndParents = await User.find({ schoolId });

  // Fetch students from the Student collection
  const students = await Student.find({ schoolId });

  // Combine the results
  const users = {
    teachers: teachersAndParents.filter((user) => user.role === "teacher"),
    parents: teachersAndParents.filter((user) => user.role === "parent"),
    students,
  };

  return users;
};

const deleteTeacherById = async (teacherId) => {
  // Find the teacher by ID
  const teacher = await User.findOne({ _id: teacherId, role: "teacher" });

  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }

  // Delete the teacher
  await User.deleteOne({ _id: teacherId });
};

const deleteParentAndStudentById = async (parentId) => {
  // Find the parent by ID and role
  const parent = await User.findOne({ _id: parentId, role: "parent" });

  if (!parent) {
    throw new ApiError(404, "Parent not found");
  }

  // Get the associated student ID from the parent document
  const studentId = parent.student;

  if (!studentId) {
    throw new ApiError(404, "Associated student not found");
  }

  // Delete the parent
  await User.deleteOne({ _id: parentId });

  // Delete the associated student
  await Student.deleteOne({ _id: studentId });
};

export default {
  createUser,
  loginWithEmailAndPassword,
  generateAuthToken,
  createTeacher,
  createStudentAndParent,
  getUsersBySchoolId,
  deleteTeacherById,
  deleteParentAndStudentById, // Add the new method
};
