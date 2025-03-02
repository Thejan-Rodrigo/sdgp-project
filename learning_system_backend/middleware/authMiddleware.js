import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";

const verifySuperAdmin = async (req, res, next) => {
  try {
    // 1️⃣ Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Access denied. No token provided.");
    }

    // 2️⃣ Extract token
    const token = authHeader.split(" ")[1];

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Find user by ID
    const user = await User.findById(decoded._id);
    if (!user) throw new ApiError(404, "User not found.");

    // 5️⃣ Check if user is super admin
    if (user.role !== "superadmin") {
      throw new ApiError(403, "Access denied. Only super admins allowed.");
    }

    // 6️⃣ Attach user to request & continue
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifySuperAdmin;
