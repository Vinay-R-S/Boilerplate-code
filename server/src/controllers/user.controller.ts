import { FastifyReply, FastifyRequest } from 'fastify';

import * as userService from '../services/user.service';
import { sendNoContent, sendSuccess } from '../utils/apiResponse';
import catchAsync from '../utils/catchAsync';

interface IdParams {
  id: string;
}

interface PaginationQuery {
  page?: string;
  limit?: string;
}

type UpdateBody = Parameters<typeof userService.updateUser>[1];

export const getUsers = catchAsync(async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const { page, limit } = req.query as PaginationQuery;

  const result = await userService.getAllUsers({
    page: Number(page) || 1,
    limit: Number(limit) || 10,
  });

  sendSuccess(reply, result.rows, 'Users fetched', 200, {
    total: result.count,
    totalPages: result.totalPages,
    currentPage: result.currentPage,
  });
});

export const getUser = catchAsync(async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const { id } = req.params as IdParams;
  const user = await userService.getUserById(Number(id));
  sendSuccess(reply, user, 'User fetched');
});

export const updateUser = catchAsync(async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const { id } = req.params as IdParams;
  const user = await userService.updateUser(Number(id), req.body as UpdateBody);
  sendSuccess(reply, user, 'User updated');
});

export const deleteUser = catchAsync(async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const { id } = req.params as IdParams;
  await userService.deleteUser(Number(id));
  sendNoContent(reply);
});
