import { NextFunction, Request, Response } from "express";
// import ErrorHandler from "./ErrorHandler";
// import { InternalError } from "./InternalError";
export const CatchAsyncError =
  (theFunc: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);

    // Promise.resolve(theFunc(req, res, next)).catch((error) => {
    //   res.setHeader("Content-Type", "application/json");
    //   if (!(error instanceof InternalError)) {
    //     error = new ErrorHandler(error.message, 500);
    //   }
    //   res.status(error.statusCode).json({
    //     success: false,
    //     message:error.message
    //   });
    // });
  };
