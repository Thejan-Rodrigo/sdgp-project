// utils/responseHandler.js
export const successResponse = (res, statusCode, data, message = "Success") => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};