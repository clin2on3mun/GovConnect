import { NextFunction, Request, Response } from 'express';
import { Agency } from '../models/agency';
import AppError from '../util/appError';
import catchAsync from '../catchAsync';
import Category from '../models/category';

new Category();
export const createAgency = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const agency = await Agency.create(req.body);
    res.status(201).json({
      status: 'successful',
      agency,
    });
  },
);

export const findAllAgencies = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const agencies = await Agency.find();
    res.status(201).json({
      status: 'successful',
      agencies,
    });
  },
);

export const findAgency = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params.id);
    const agency = await Agency.findById(req.params.id).populate({
      path: 'categories',
    });

    if (!agency) {
      return next(new AppError('Agency not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        agency,
      },
    });
  },
);

export const updateAgency = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const agency = await Agency.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!agency) {
      return next(new AppError('No Agency found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        agency,
      },
    });
  },
);

export const deleteAgency = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const agency = await Agency.findByIdAndDelete(req.params.id);
    if (!agency) {
      return next(new AppError('No Agency found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: null,
    });
  },
);
