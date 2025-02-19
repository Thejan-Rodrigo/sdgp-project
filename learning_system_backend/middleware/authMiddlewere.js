import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError';
import { statusCodes } from '../config/constants';
import User from '../models/User';

const auth = (...requiredRights) => {
  return async (req, res, next) => {
    try {
      // Get token from header
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        throw new ApiError(statusCodes.UNAUTHORIZED, 'Please authenticate');
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user
      const user = await User.findOne({ 
        _id: decoded.userId,
        isActive: true 
      });

      if (!user) {
        throw new ApiError(statusCodes.UNAUTHORIZED, 'User not found');
      }

      // Check if password has been changed after token was issued
      if (user.changedPasswordAfter && user.changedPasswordAfter(decoded.iat)) {
        throw new ApiError(statusCodes.UNAUTHORIZED, 'Password recently changed. Please login again');
      }

      // Check user rights
      if (requiredRights.length && !requiredRights.includes(user.role)) {
        throw new ApiError(statusCodes.FORBIDDEN, 'Insufficient permissions');
      }

      // Attach user to request
      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        next(new ApiError(statusCodes.UNAUTHORIZED, 'Invalid token'));
      } else if (error.name === 'TokenExpiredError') {
        next(new ApiError(statusCodes.UNAUTHORIZED, 'Token expired'));
      } else {
        next(error);
      }
    }
  };
};

export default auth;
