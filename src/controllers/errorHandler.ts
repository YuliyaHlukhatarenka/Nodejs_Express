import { Response, Request, NextFunction } from "express";
import { logger } from "../logger/logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err);
  res.status(500);
  res.send({ message: err.message });
};
