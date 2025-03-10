export const successResponse = (res, statusCode, data) => {
  res.status(statusCode).json(data);
};