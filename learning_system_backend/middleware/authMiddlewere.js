import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import status from "../config/constants.js";
import User from '../models/User.js';

const auth = (...requiredRights) => {
  return async (req, res, next) => {
    try {
      // Get token from header
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        throw new ApiError(status.statusCodes.UNAUTHORIZED, 'Please authenticate');
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user
      const user = await User.findOne({ 
        _id: decoded.userId,
        isActive: true 
      });

      if (!user) {
        throw new ApiError(status.statusCodes.UNAUTHORIZED, 'User not found');
      }

      // Check if password has been changed after token was issued
      if (user.changedPasswordAfter && user.changedPasswordAfter(decoded.iat)) {
        throw new ApiError(status.statusCodes.UNAUTHORIZED, 'Password recently changed. Please login again');
      }

      // Check user rights
      if (requiredRights.length && !requiredRights.includes(user.role)) {
        throw new ApiError(status.statusCodes.FORBIDDEN, 'Insufficient permissions');
      }

      // Attach user to request
      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        next(new ApiError(status.statusCodes.UNAUTHORIZED, 'Invalid token'));
      } else if (error.name === 'TokenExpiredError') {
        next(new ApiError(status.statusCodes.UNAUTHORIZED, 'Token expired'));
      } else {
        next(error);
      }
    }
  };
};

export default auth;
