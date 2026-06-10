import { Request, Response } from 'express';

import * as userService from '../services/user.service';
import { sendNoContent, sendSuccess } from '../utils/apiResponse';
import catchAsync from '../utils/catchAsync';

export const getUsers = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const page = Number(req.query['page']) || 1;
  const limit = Number(req.query['limit']) || 10;

  const result = await userService.getAllUsers({ page, limit });

  sendSuccess(res, result.rows, 'Users fetched', 200, {
    total: result.count,
    totalPages: result.totalPages,
    currentPage: result.currentPage,
  });
});

export const getUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const user = await userService.getUserById(Number(req.params['id']));
  sendSuccess(res, user, 'User fetched');
});

export const updateUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const user = await userService.updateUser(Number(req.params['id']), req.body);
  sendSuccess(res, user, 'User updated');
});

export const deleteUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  await userService.deleteUser(Number(req.params['id']));
  sendNoContent(res);
});
