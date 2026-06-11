import fastifyCompress from '@fastify/compress';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastify, { FastifyInstance } from 'fastify';

import { env } from './config/env';
import logger from './config/logger';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';
import { rateLimiter } from './middlewares/rateLimiter';
import routes from './routes';

const buildApp = async (): Promise<FastifyInstance> => {
  const app = fastify({
    logger: false,
    bodyLimit: 10 * 1024,
  });

  // Security
  await app.register(fastifyHelmet);
  await app.register(fastifyCors, {
    origin: env.CORS_ORIGIN,
    credentials: true,
  });
  await app.register(rateLimiter);

  // Compression
  await app.register(fastifyCompress);

  // Request logging
  if (env.NODE_ENV !== 'test') {
    app.addHook('onResponse', async (req, reply) => {
      const line =
        env.NODE_ENV === 'development'
          ? `${req.method} ${req.url} ${reply.statusCode}`
          : `${req.ip} - "${req.method} ${req.url} HTTP/${req.raw.httpVersion}" ${reply.statusCode}`;
      logger.info(line);
    });
  }

  // Routes
  await app.register(routes, { prefix: '/api/v1' });

  // Error handling
  app.setErrorHandler(errorHandler);
  app.setNotFoundHandler(notFound);

  return app;
};

export default buildApp;
