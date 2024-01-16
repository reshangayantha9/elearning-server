import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { InternalError } from "./Exception/InternalError";
require("dotenv").config();
import userRouter from "./routes/userRoute";
import courseRouter from "./routes/courseRoute";
import orderRouter from "./routes/orderRoute";
import notificationRoute from "./routes/notificationRoute";
import analyticsRouter from "./routes/analyticsRoute";
import layoutRouter from "./routes/layoutRoute";
export const app = express();

app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials:true
  })
);



// routes

app.use("/api/v1", userRouter, courseRouter, orderRouter, notificationRoute,analyticsRouter,layoutRouter);

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(InternalError);