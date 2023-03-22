// import { DEBUG_MODE } from '../config';
import { ValidationError } from "joi";
import CustomErrorHandler from "./customErrorHandler";

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let data = {
    message: "Something went wrong! We are trying to fix it",
    // ...(DEBUG_MODE === 'true' && { originalError: err.message})
  };
  if (err instanceof ValidationError) {
    statusCode = 422 || 400;

    data = {
      success: false,
      message: err.message,
    };
  }

  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    if (err.message.message) {
      data = {
        success: false,
        message: err.message.message,
      };
    } else {
      data = {
        success: false,
        message: err.message,
      };
    }
  }

  return res.status(statusCode).json(data);
};

export default errorHandler;
