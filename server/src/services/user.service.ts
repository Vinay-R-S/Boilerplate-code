import { StatusCodes } from 'http-status-codes';

import { User, UserAttributes } from '../models/User';
import { AppError } from '../utils/AppError';

interface PaginationOptions {
  page: number;
  limit: number;
}

interface PaginatedResult<T> {
  rows: T[];
  count: number;
  totalPages: number;
  currentPage: number;
}

export const getAllUsers = async (
  options: PaginationOptions,
): Promise<PaginatedResult<Omit<UserAttributes, 'password'>>> => {
  const { page, limit } = options;
  const offset = (page - 1) * limit;

  const { rows, count } = await User.findAndCountAll({
    attributes: { exclude: ['password'] },
    limit,
    offset,
    order: [['created_at', 'DESC']],
  });

  return {
    rows: rows.map((u) => u.toSafeJSON()),
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
};

export const getUserById = async (
  id: number,
): Promise<Omit<UserAttributes, 'password'>> => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    throw new AppError('User not found', StatusCodes.NOT_FOUND);
  }

  return user.toSafeJSON();
};

export const updateUser = async (
  id: number,
  updates: Partial<Pick<UserAttributes, 'name' | 'email'>>,
): Promise<Omit<UserAttributes, 'password'>> => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new AppError('User not found', StatusCodes.NOT_FOUND);
  }

  await user.update(updates);

  return user.toSafeJSON();
};

export const deleteUser = async (id: number): Promise<void> => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new AppError('User not found', StatusCodes.NOT_FOUND);
  }

  await user.destroy();
};
