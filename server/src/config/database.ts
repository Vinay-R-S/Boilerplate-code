import 'reflect-metadata';

import { Sequelize } from 'sequelize-typescript';

import { User } from '../models/User';
import { env } from './env';
import logger from './logger';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  models: [User],
  logging: (sql) => {
    if (env.NODE_ENV === 'development') {
      logger.debug(sql);
    }
  },
  pool: {
    max: env.DB_POOL_MAX,
    min: env.DB_POOL_MIN,
    acquire: env.DB_POOL_ACQUIRE,
    idle: env.DB_POOL_IDLE,
  },
  define: {
    timestamps: true,
    underscored: true,
  },
});

export const connectDatabase = async (): Promise<void> => {
  await sequelize.authenticate();
  // Sync in development only — use migrations in production
  if (env.NODE_ENV === 'development') {
    await sequelize.sync({ alter: true });
  }
};
