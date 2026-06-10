import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import { User, UserCreationAttributes } from '../models/User';
import { AppError } from '../utils/AppError';

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResult {
  token: string;
  user: Omit<import('../models/User').UserAttributes, 'password'>;
}

const signToken = (id: number, email: string): string =>
  jwt.sign({ id, email }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  } as jwt.SignOptions);

export const registerUser = async (
  payload: UserCreationAttributes,
): Promise<AuthResult> => {
  const existingUser = await User.findOne({ where: { email: payload.email } });

  if (existingUser) {
    throw new AppError('Email is already registered', StatusCodes.CONFLICT);
  }

  const user = await User.create(payload);
  const token = signToken(user.id, user.email);

  return { token, user: user.toSafeJSON() };
};

export const loginUser = async (payload: LoginPayload): Promise<AuthResult> => {
  const user = await User.findOne({ where: { email: payload.email } });

  if (!user || !(await user.comparePassword(payload.password))) {
    throw new AppError('Incorrect email or password', StatusCodes.UNAUTHORIZED);
  }

  if (!user.isActive) {
    throw new AppError('Your account has been deactivated', StatusCodes.FORBIDDEN);
  }

  const token = signToken(user.id, user.email);

  return { token, user: user.toSafeJSON() };
};
