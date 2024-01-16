import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../Exception/catchAsyncError";
import ErrorHandler from "../Exception/ErrorHandler";
import { generateLast12MonthsDate } from "../utils/analyticsGenerator";
import userModel from "../models/userModel";
import CourseModel from "../models/courseModel";
import OrderModel from "../models/orderModel";

//get user analytics --only for admin
export const getUsersAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await generateLast12MonthsDate(userModel);
      res.status(200).json({
        success: true,
        users,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get courses analytics --only for admin
export const getCoursesAnalytics = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const courses= await generateLast12MonthsDate(CourseModel);
        res.status(200).json({
          success: true,
          courses,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  );
  

//get orders analytics --only for admin
export const getOrdersAnalytics = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const orders= await generateLast12MonthsDate(OrderModel);
        res.status(200).json({
          success: true,
          orders,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  );
  