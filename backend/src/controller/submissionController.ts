import { NextFunction, Request, Response } from 'express';
import catchAsync from '../util/catchAsync';
import { IfeedBack, Submission } from '../models/submission';
import AppError from '../util/appError';
import Agency from '../models/agency';
import SubmissionService from '../services/submissionService';
import {
  responseSchema,
  submissionUpdateValidationSchema,
  submissionValidationSchema,
} from '../validators/validationSchema';
import handleValidation from '../util/handleValidation';

const submissionService = new SubmissionService();
export const createSubmission = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    if (!userId) {
      return next(new AppError('User not authenticated', 401));
    }
    const result = handleValidation(req.body, submissionValidationSchema);
    if (!result.success) {
      const errorMessages = result.error.errors
        .map((err) => `${err.path}: ${err.message}`)
        .join(', ');
      return next(new AppError(errorMessages, 400));
    }
    const submission = await Submission.create({
      ...result.data,
      userId: userId,
    });

    res.status(201).json({
      status: 'success',
      data: submission,
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

    if (currentUserId.toString() === requestedUserId) {
      const submission = await submissionService.findUserorAgentSubmissions(
        'userId',
        currentUserId,
      );
      return res.status(201).json({
        status: 'success',
        data: submission,
      });
    }
    const agency = await Agency.findById(req.params.agencyId);

    if (!agency) {
      return next(new AppError('No agency found with this ID', 404));
    }
    if (agency && agency?.admin.toString() === currentUserId.toString()) {
      const submission = await submissionService.findUserorAgentSubmissions(
        'agencyId',
        agency?._id,
      );
      return res.status(201).json({
        status: 'success',
        data: submission,
      });
    }

    return next(
      new AppError('You are not authorized to view these submissions', 403),
    );
  },
);

export const findAllSubmission = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role !== 'superadmin') {
      return next(
        new AppError('Only superadmin can access all submissions', 403),
      );
    }
    const submissions = await Submission.find().populate(
      'userId agencyId categoryId',
    );
    res.status(200).json({
      status: 'success',
      results: submissions.length,
      data: submissions,
    });
  },
);
export const deleteSubmission = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const submission = await submissionService.findById(req.params.id);

    if (!submission) {
      return next(new AppError('No submission found with that ID', 404));
    }

    const currentUserId = req.user._id;
    const currentUserRole = req.user.role;

    if (currentUserRole === 'superadmin') {
      await submission.deleteOne();
    } else if (
      currentUserRole === 'guest' &&
      submission.userId.toString() === currentUserId.toString()
    ) {
      await submission.deleteOne();
    } else {
      return next(
        new AppError('You are not authorized to delete this submission', 403),
      );
    }

    res.status(200).json({
      status: 'success',
      data: null,
    });
  },
);

export const getSubmission = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const submission = await submissionService.findById(req.params.id);
    if (!submission) {
      return next(new AppError('No submission found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: submission,
    });
  },
);

export const respondToSubmission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user._id;
  const submissionId = req.params.id;
  const result = responseSchema.safeParse(req.body);

  if (!result.success) {
    const errorMessages = result.error.errors
      .map((err) => `${err.path}: ${err.message}`)
      .join(', ');
    return next(new AppError(errorMessages, 400));
  }
  console.log(result.error);
  const { message } = result.data;
  if (!message) {
    return next(new AppError('Response message is required', 400));
  }

  const submission = await submissionService.findById(submissionId, 'agencyId');

  if (!submission) {
    return next(new AppError('No submission found with that ID', 404));
  }

  const agency = await Agency.findById(submission.agencyId);

  if (!agency || agency.admin.toString() !== userId.toString()) {
    return next(
      new AppError('You are not authorized to respond to this submission', 403),
    );
  }

  submission.response = {
    message,
    respondedAt: new Date(),
    respondedBy: userId,
  };
  submission.status = 'resolved';
  await submission.save();
  res.status(200).json({
    status: 'success',
    data: submission,
  });
};

export const updateSubmission = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user._id;
    const submission = await Submission.findOne({ userId: user });
    if (!user || !submission) {
      return next(
        new AppError(
          'You are not authorized to respond to this submission',
          403,
        ),
      );
    }
    const result = submissionUpdateValidationSchema.safeParse(req.body);
    if (!result.success) {
      const errorMessages = result.error.errors
        .map((err) => `${err.path}: ${err.message}`)
        .join(', ');
      return next(new AppError(errorMessages, 400));
    }
    const updateSubmission = await submissionService.findUpdateSubmission(
      req.params.id,
      result.data as Partial<IfeedBack>,
    );
    console.log(updateSubmission);
    if (!updateSubmission) {
      return next(new AppError('No submission found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: updateSubmission,
    });
  },
);
