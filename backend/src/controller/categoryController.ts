import category from '../models/category';
import AppError from '../util/appError';
import catchAsync from '../util/catchAsync';
import { Request, Response, NextFunction } from 'express';

export const getCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await category.find();
    if (!categories) {
      return next(new AppError('No categories Found', 404));
    }
    res.status(200).json({
      status: 'success',
      data: categories,
    });
  },
);
