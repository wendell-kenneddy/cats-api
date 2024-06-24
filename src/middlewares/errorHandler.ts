import { NextFunction, Request, Response } from "express";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV == "development") console.log(err);

  res.status(500).json({
    message: "Something went wrong.",
  });
}
