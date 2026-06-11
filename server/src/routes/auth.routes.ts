import { FastifyInstance } from 'fastify';

import * as authController from '../controllers/auth.controller';
import { authenticate } from '../middlewares/authenticate';
import { validate } from '../middlewares/validate';
import { loginSchema, registerSchema } from '../validators/auth.validators';

const authRoutes = async (app: FastifyInstance): Promise<void> => {
  app.post('/register', { preHandler: validate(registerSchema) }, authController.register);
  app.post('/login', { preHandler: validate(loginSchema) }, authController.login);
  app.get('/me', { preHandler: [authenticate] }, authController.getMe);
};

export default authRoutes;
