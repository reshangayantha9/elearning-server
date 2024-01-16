import NotificationModel from "../models/notificationModel";
import { NextFunction,Request,Response } from "express";
import { CatchAsyncError } from "../Exception/catchAsyncError";
import ErrorHandler from "../Exception/ErrorHandler";
import crons from 'node-cron';
//get all notifications ---only admin
export const getNotification = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const notification =await NotificationModel.find().sort({createdAt:-1});

        res.status(201).json({
            success:true,
            notification
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,500));
    }
})

//update notification status ---only admin
export const updateNotification = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const notification =await NotificationModel.findById(req.params.id);
        if(!notification){
            return next(new ErrorHandler("Notification not found",404));
        }else{
            notification.status ? notification.status='read':notification?.status;
        }
        await notification.save();
        const notifications =await NotificationModel.find().sort({createdAt:-1});
        res.status(201).json({
            success:true,
            notifications
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,500));
    }
})

//delete notification
crons.schedule("0 0 0 * * *",async()=>{
    const thirtyDayAgo =new Date(Date.now()-30*24*60*60*1000);
    await NotificationModel.deleteMany({status:"read",createAt:{$lt:thirtyDayAgo}});
});