import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/User';
import { signToken } from '../config/token';
import AppError from '../util/appError';
import catchAsync from '../catchAsync';

const createSendToken = (user: IUser, statusCode: number, res: Response) => {
  const token = signToken(user._id);
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

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const takenEmail = await User.findOne({ email });
    if (takenEmail) {
      res.status(400).json({
        status: 'failed',
        message: 'email already taken',
      });
    } else {
      const user = await User.create(req.body);

      createSendToken(user, 201, res);
    }
  },
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError('Please enter email or password', 400));
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 400));
    }
    createSendToken(user, 200, res);
  },
);
