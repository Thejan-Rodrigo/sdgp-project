// utils/responseHandler.js
export const successResponse = (res, statusCode, data, message = "Success") => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (res, message = "Error", statusCode = 500) => {
  res.status(statusCode).json({ success: false, message });
};