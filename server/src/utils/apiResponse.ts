import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = StatusCodes.OK,
  meta?: Record<string, unknown>,
): Response<ApiResponse<T>> =>
  res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(meta && { meta }),
  });

export const sendCreated = <T>(
  res: Response,
  data: T,
  message = 'Created successfully',
): Response<ApiResponse<T>> =>
  sendSuccess(res, data, message, StatusCodes.CREATED);

export const sendNoContent = (res: Response): Response =>
  res.status(StatusCodes.NO_CONTENT).send();
