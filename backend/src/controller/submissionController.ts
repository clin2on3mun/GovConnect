import { NextFunction, Request, Response } from 'express';
import catchAsync from '../catchAsync';
import { Submission } from '../models/submission';
import AppError from '../util/appError';

export const createSubmission = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    if (!userId) {
      return next(new AppError('User not authenticated', 401));
    }
    const submission = Submission.create({ ...req.body, userId: userId });

    res.status(201).json({
      status: 'success',
      data: {
        submission,
      },
    });
  },
);

export const findSubmission = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const currentUserId = req.user._id;
    const requestedUserId = req.params.user;

    if (!currentUserId) {
      return next(new AppError('User not authenticated', 401));
    }
    // const status = req.query.status as string;
    // const filter: { userId: string; status?: string } = { userId };

    // if (status) {
    //   filter.status = status;
    // }
    console.log(req.params, 'requestUserId');
    if (currentUserId.toString() !== requestedUserId) {
      return next(
        new AppError('You are not authorized to view these submissions', 403),
      );
    }

    const submission = await Submission.find({ userId: currentUserId });
    res.status(201).json({
      status: 'success',
      data: {
        submission,
      },
    });
  },
);
