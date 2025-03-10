class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true; // Mark it as an operational error to avoid unwanted crashes
  }
}

export default ApiError;