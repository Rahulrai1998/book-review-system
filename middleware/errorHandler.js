import { statusCodeConstants } from "../constants.js";

export const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ?? 500;

  switch (statusCode) {
    case statusCodeConstants.VALIDATION_ERROR:
      res.json({
        title: "Validation failed!",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case statusCodeConstants.NOT_FOUND:
      res.json({
        title: "NOT FOUND",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case statusCodeConstants.UNAUTHORIZED:
      res.json({
        title: "UNAUTHORIZED",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case statusCodeConstants.FORBIDDEN:
      res.json({
        title: "FORBIDDEN",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case statusCodeConstants.SERVER_ERROR:
      res.json({
        title: "SERVER ERROR",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    default:
      console.log("No error all good!!");
      break;
  }
};
