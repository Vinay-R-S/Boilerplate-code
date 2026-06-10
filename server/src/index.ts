import 'reflect-metadata';
import 'dotenv/config';

import { createServer } from 'http';

import app from './app';
import { connectDatabase } from './config/database';
import { env } from './config/env';
import logger from './config/logger';

const server = createServer(app);

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    logger.info('Database connected successfully');

    server.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT} [${env.NODE_ENV}]`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

const shutdown = (signal: string): void => {
  logger.info(`${signal} received — shutting down gracefully`);
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

void startServer();
