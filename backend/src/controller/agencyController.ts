import { NextFunction, Request, Response } from 'express';
import Agency from '../models/agency';
import AppError from '../util/appError';
import catchAsync from '../util/catchAsync';
import Category from '../models/category';
import handleValidation from '../util/handleValidation';
import {
  agencyValidationSchema,
  updateAgencySchema,
} from '../validators/validationSchema';

new Category();
export const createAgency = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = handleValidation(req.body, agencyValidationSchema);
    if (!result.success) {
      const errorMessages = result.error.errors
        .map((err) => `${err.path}: ${err.message}`)
        .join(', ');
      return next(new AppError(errorMessages, 400));
    }
    const agency = await Agency.create(result.data);
    res.status(201).json({
      status: 'successful',
      data: agency,
    });
  },
);

export const findAllAgencies = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const agencies = await Agency.find({ active: true });
    res.status(200).json({
      status: 'successful',
      data: agencies,
    });
  },
);

export const findAgency = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const agency = await Agency.findById(req.params.id).populate({
      path: 'categories',
    });

    if (!agency) {
      return next(new AppError('Agency not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: agency,
    });
  },
);

export const updateAgency = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = handleValidation(req.body, updateAgencySchema);
    if (!result.success) {
      const errorMessages = result.error.errors
        .map((err) => `${err.path}: ${err.message}`)
        .join(', ');
      return next(new AppError(errorMessages, 400));
    }
    const agency = await Agency.findByIdAndUpdate(req.params.id, result.data, {
      new: true,
      runValidators: true,
    });
    if (!agency) {
      return next(new AppError('No Agency found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: agency,
    });
  },
);

export const deleteAgency = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const agency = await Agency.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true },
    );

    if (!agency) {
      return next(new AppError('No Agency found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      message: 'Agency soft-deleted successfully',
    });
  },
);

export const restoreAgency = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const agency = await Agency.findByIdAndUpdate(
      req.params.id,
      { active: true },
      { new: true },
    );

    if (!agency) {
      return next(new AppError('No Agency found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: agency,
    });
  },
);
