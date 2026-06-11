import 'reflect-metadata';
import 'dotenv/config';

import buildApp from './app';
import { connectDatabase } from './config/database';
import { env } from './config/env';
import logger from './config/logger';

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    logger.info('Database connected successfully');

    const app = await buildApp();

    await app.listen({ port: env.PORT, host: '0.0.0.0' });
    logger.info(`Server running on port ${env.PORT} [${env.NODE_ENV}]`);

    const shutdown = (signal: string): void => {
      logger.info(`${signal} received, shutting down gracefully`);
      void app.close().then(() => {
        logger.info('HTTP server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

void startServer();
