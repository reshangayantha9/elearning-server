import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../Exception/catchAsyncError";
import ErrorHandler from "../Exception/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";
import { IUser } from "../models/userModel";
import { updateAccessToken } from "../controller/userController";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
//Authenticated User
export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;
    if (!access_token) {
      return next(
        new ErrorHandler("Please Login to access this resource", 400)
      );
    }

    const decode = jwt.decode(
      access_token
    ) as JwtPayload;

    if (!decode) {
      return next(new ErrorHandler("Access token is not valid", 400));
    }
    if (decode.exp && decode.exp <= Date.now() / 1000) {
      try {
        await updateAccessToken(req, res, next);
      } catch (error) {
        return next(error);
      }
    } else {
      const user = await redis.get(decode.id);

      if (!user) {
        return next(
          new ErrorHandler("Please login to access this resource", 400)
        );
      }

      req.user = JSON.parse(user);
      next();
    }
  }
);

//Validate user role
export const authorizeRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Role: ${req.user?.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
