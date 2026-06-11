import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import * as authService from '../services/auth.service';
import { sendCreated, sendSuccess } from '../utils/apiResponse';
import catchAsync from '../utils/catchAsync';

type RegisterBody = Parameters<typeof authService.registerUser>[0];
type LoginBody = Parameters<typeof authService.loginUser>[0];

export const register = catchAsync(async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const result = await authService.registerUser(req.body as RegisterBody);
  sendCreated(reply, result, 'Registration successful');
});

export const login = catchAsync(async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const result = await authService.loginUser(req.body as LoginBody);
  sendSuccess(reply, result, 'Login successful', StatusCodes.OK);
});

export const getMe = catchAsync(async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
  sendSuccess(reply, req.user, 'Profile fetched');
});
