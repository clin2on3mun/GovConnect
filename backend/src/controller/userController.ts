import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/User';
import { signToken } from '../config/token';
import AppError from '../util/appError';
import catchAsync from '../util/catchAsync';
import UserService from '../services/userService';
import { loginSchema, signupSchema } from '../validators/validationSchema';

const userService = new UserService();

const createSendToken = (user: IUser, statusCode: number, res: Response) => {
  const token = signToken(user._id.toString());
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: false,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
      return next(new AppError(result.error.errors[0].message, 400));
    }

    const { email } = result.data;
    const takenEmail = await User.findOne({ email });
    if (takenEmail) {
      res.status(400).json({
        status: 'failed',
        message: 'email already taken',
      });
    } else {
      const user = await userService.signUp(result.data);

      createSendToken(user, 201, res);
    }
  },
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return next(new AppError(result.error.errors[0].message, 400));
    }
    const { email, password } = result.data;
    if (!email || !password) {
      return next(new AppError('Please enter email or password', 400));
    }
    const user = await userService.logIn(email);
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 400));
    }
    createSendToken(user, 200, res);
  },
);

export const logOut = (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(201).json({
    message: 'logout successfully',
  });
};

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const role = req.user.role;
    if (role !== 'superadmin') {
      return new AppError(
        'You are not authorized to view these submissions',
        403,
      );
    }
    const users = await User.find();

    res.status(200).json({
      status: 'successful',
      data: users,
    });
  },
);

export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    res.status(200).json({ user: req.user });
  },
);
