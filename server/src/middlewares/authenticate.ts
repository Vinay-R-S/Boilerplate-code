import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import '../types'; // loads global FastifyRequest augmentation
import { AppError } from '../utils/AppError';

interface DecodedToken {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

export const authenticate = async (req: FastifyRequest, _reply: FastifyReply): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    throw new AppError('No token provided. Please log in.', StatusCodes.UNAUTHORIZED);
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token as string, env.JWT_SECRET) as DecodedToken;
  req.user = decoded;
};
