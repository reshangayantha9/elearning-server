import ErrorHandler from "./ErrorHandler";
import { NextFunction, Request, Response } from "express";

export const InternalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  //wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  //JWT expired error
  if (err.name === "jwt expired") {
    const message = `Json web token is expired, try again`;
    err = new ErrorHandler(message, 400);
  }
  res.setHeader("Content-Type", "application/json");
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  })
};
