import rateLimit from '@fastify/rate-limit';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { StatusCodes } from 'http-status-codes';

export const rateLimiter: FastifyPluginAsync = async (app: FastifyInstance): Promise<void> => {
  await app.register(rateLimit, {
    max: 100,
    timeWindow: '15 minutes',
    errorResponseBuilder: () => ({
      success: false,
      message: 'Too many requests from this IP. Please try again after 15 minutes.',
      statusCode: StatusCodes.TOO_MANY_REQUESTS,
    }),
  });
};
