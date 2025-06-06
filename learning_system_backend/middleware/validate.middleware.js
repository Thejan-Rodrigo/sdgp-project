import { validationResult } from 'express-validator';
import ApiError from '../utils/ApiError.js';
import status from "../config/constants.js";

const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = errors.array().map(err => ({
      field: err.param,
      message: err.msg
    }));

    next(new ApiError(status.statusCodes.BAD_REQUEST, 'Validation Error', true, null, extractedErrors));
  };
};

export default validate;
