import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../Exception/catchAsyncError";
import CourseModel from "../models/courseModel";
//create course
export const createCourse=CatchAsyncError(async(data:any,res:Response,next:NextFunction)=>{
    const course=await CourseModel.create(data);
    res.status(201).json({
        success:true,
        course
    })
})


//Get All courses
export const getAllCoursesService=async (res:Response)=>{
    const courses=await CourseModel.find().sort({createdAt:-1});
    res.status(201).json({
      success: true,
      courses,
    });
  }