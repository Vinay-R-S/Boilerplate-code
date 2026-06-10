import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import '../types'; // loads global Express.Request augmentation
import { AppError } from '../utils/AppError';

interface DecodedToken {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    throw new AppError('No token provided. Please log in.', StatusCodes.UNAUTHORIZED);
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, env.JWT_SECRET) as DecodedToken;
  req.user = decoded;
  next();
};
