import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ApiError from "../utils/ApiError.js"; // Import error handling class

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


const loginWithEmailAndPassword = async (email, password) => {
  //console.log(user.password)
  console.log(password)
  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, "Invalid email or password");

  console.log(password);
  console.log(user.password);


  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(401, "Invalid email or password");

  // Update last login time
  user.lastLogin = new Date();
  await user.save();

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

export default { createUser, loginWithEmailAndPassword, generateAuthToken };
