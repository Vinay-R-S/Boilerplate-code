import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import { env } from '../config/env';
import logger from '../config/logger';
import { AppError } from '../utils/AppError';

interface ErrorResponse {
  success: false;
  message: string;
  stack?: string;
}

const handleSequelizeValidationError = (err: Error): AppError =>
  new AppError(err.message, StatusCodes.UNPROCESSABLE_ENTITY);

const handleJwtError = (): AppError =>
  new AppError('Invalid token. Please log in again.', StatusCodes.UNAUTHORIZED);

const handleJwtExpiredError = (): AppError =>
  new AppError('Your token has expired. Please log in again.', StatusCodes.UNAUTHORIZED);

export const errorHandler = (
  err: FastifyError | Error,
  _req: FastifyRequest,
  reply: FastifyReply,
): void => {
  let error =
    err instanceof AppError
      ? err
      : new AppError(err.message, StatusCodes.INTERNAL_SERVER_ERROR, false);

  // Map known third-party errors to operational AppErrors
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    error = handleSequelizeValidationError(err);
  }
  if (err.name === 'JsonWebTokenError') error = handleJwtError();
  if (err.name === 'TokenExpiredError') error = handleJwtExpiredError();

  if (!error.isOperational) {
    logger.error('UNHANDLED ERROR:', err);
  }

  const response: ErrorResponse = {
    success: false,
    message: error.isOperational ? error.message : 'Something went wrong',
  };

  if (env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  void reply.status(error.statusCode).send(response);
};
