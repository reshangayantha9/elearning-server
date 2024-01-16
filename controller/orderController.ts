import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../Exception/catchAsyncError";
import ErrorHandler from "../Exception/ErrorHandler";
import OrderModel, { IOrder } from "../models/orderModel";
import userModel from "../models/userModel";
import CourseModel from "../models/courseModel";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notificationModel";
import { newOrder } from "../services/orderService";
import { getAllCoursesService } from "../services/courseService";

//create order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;
      const user = await userModel.findById(req.user?._id);

      // Check if user and user.courses are defined and user.courses is an array
      if (!user || !user.courses || !Array.isArray(user.courses)) {
        console.error("Invalid user data:", user);
        return next(
          new ErrorHandler("Invalid user data: courses array not found", 500)
        );
      }

      const courseExistInUser = user.courses.some(
        (course: any) => course._id === courseId
      );

      if (courseExistInUser) {
        return next(
          new ErrorHandler("You have already purchased this course", 400)
        );
      }

      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
        payment_info,
      };

      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };
      const html = await ejs.renderFile(path.resolve(__dirname,'../mails/order-confirmation.ejs'),{order:mailData});

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }

      user?.courses.push(course?._id);
      await user?.save();

      await NotificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `You have a new order from ${course?.name}`,
      });
      course.purchased ? course.purchased +=1 :course.purchased;
      await course.save();
      newOrder(data, res, next);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get all orders --only for admin
export const getAllOrders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllCoursesService(res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);