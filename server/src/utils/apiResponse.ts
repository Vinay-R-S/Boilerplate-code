import { FastifyReply } from 'fastify';
import { StatusCodes } from 'http-status-codes';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
}

export const sendSuccess = <T>(
  reply: FastifyReply,
  data: T,
  message = 'Success',
  statusCode = StatusCodes.OK,
  meta?: Record<string, unknown>,
): void => {
  void reply.status(statusCode).send({
    success: true,
    message,
    data,
    ...(meta && { meta }),
  } satisfies ApiResponse<T>);
};

export const sendCreated = <T>(
  reply: FastifyReply,
  data: T,
  message = 'Created successfully',
): void => sendSuccess(reply, data, message, StatusCodes.CREATED);

export const sendNoContent = (reply: FastifyReply): void => {
  void reply.status(StatusCodes.NO_CONTENT).send();
};
