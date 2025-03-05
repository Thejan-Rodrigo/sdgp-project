import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";

const verifySuperAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new ApiError(401, "Access denied. No token provided.");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user || user.role !== "superadmin") {
      throw new ApiError(403, "Access denied. Only super admins allowed.");
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    next(error);
  }
};

export default { verifySuperAdmin };
