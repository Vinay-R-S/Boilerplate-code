import rateLimit from 'express-rate-limit';
import { StatusCodes } from 'http-status-codes';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
  statusCode: StatusCodes.TOO_MANY_REQUESTS,
});
