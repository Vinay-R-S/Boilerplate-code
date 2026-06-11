import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import { AppError } from '../utils/AppError';

export const notFound = (req: FastifyRequest, _reply: FastifyReply): void => {
  throw new AppError(`Route not found: ${req.url}`, StatusCodes.NOT_FOUND);
};
