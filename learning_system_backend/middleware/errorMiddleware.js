import { ApiError } from "../utils/ApiError.js"; // Use curly braces for named export

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorMiddleware;