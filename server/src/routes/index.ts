import { FastifyInstance } from 'fastify';

import authRoutes from './auth.routes';
import userRoutes from './user.routes';

const routes = async (app: FastifyInstance): Promise<void> => {
  // Health check
  app.get('/health', async (_req, reply) => {
    await reply.send({ success: true, message: 'Server is healthy', timestamp: new Date().toISOString() });
  });

  await app.register(authRoutes, { prefix: '/auth' });
  await app.register(userRoutes, { prefix: '/users' });
};

export default routes;
