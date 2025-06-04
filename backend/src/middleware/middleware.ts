import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../util/appError';
import User from '../models/User';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../util/catchAsync';

export interface jwtWithUserId extends JwtPayload {
  userId: string;
}

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    if (!req.cookies || !req.cookies.jwt) {
      return next(
        new AppError('You are not logged in please login to get access', 401),
      );
    }

    const decoded = <jwtWithUserId>(
      await jwt.verify(token, process.env.JWT_SECRET!)
    );

    const currentUser = await User.findById(decoded.userId);

    if (!currentUser) {
      return next(
        new AppError('The user belonging to this token no longer exists', 401),
      );
    }

    req.user = currentUser;

    next();
  },
);

export const restrictTo =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }
    next();
  };
