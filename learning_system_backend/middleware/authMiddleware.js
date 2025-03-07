import jwt, { decode } from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";

const verifySuperAdmin = async (req, res, next) => {
  try {
    console.log("Hello Auth1")
    // 1️⃣ Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Access denied. No token provided.");
    }

    console.log("Hello Auth1")
    // 2️⃣ Extract token
    const token = authHeader.split(" ")[1];

    console.log("Hello Auth2")
    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded._id);

    console.log("Hello Auth3")
    // 4️⃣ Find user by ID
    const user = await User.findById(decoded._id);
    if (!user) throw new ApiError(404, "User not found.");

    console.log("Hello Auth4")
    // 5️⃣ Check if user is super admin
    if (user.role !== "superadmin") {
      throw new ApiError(403, "Access denied. Only super admins allowed.");
    }

    console.log("Hello Auth5")
    // 6️⃣ Attach user to request & continue
    req.user = user;
    console.log("Hello Auth6")
    next();
  } catch (error) {
    console.log("Hello Auth error")
    next(error);
  }
};

export default verifySuperAdmin;
