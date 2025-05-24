import { NextFunction, Response, Request } from 'express';
import AppError from './appError';

export default (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message || 'Something went wrong',
  });
};
