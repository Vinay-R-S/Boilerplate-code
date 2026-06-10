import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as authService from '../services/auth.service';
import { sendCreated, sendSuccess } from '../utils/apiResponse';
import catchAsync from '../utils/catchAsync';

export const register = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const result = await authService.registerUser(req.body);
  sendCreated(res, result, 'Registration successful');
});

export const login = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const result = await authService.loginUser(req.body);
  sendSuccess(res, result, 'Login successful', StatusCodes.OK);
});

export const getMe = catchAsync(async (req: Request, res: Response): Promise<void> => {
  sendSuccess(res, req.user, 'Profile fetched');
});
