import { FastifyInstance } from 'fastify';

import * as userController from '../controllers/user.controller';
import { authenticate } from '../middlewares/authenticate';
import { validate } from '../middlewares/validate';
import { updateUserSchema, userIdSchema } from '../validators/user.validators';

const userRoutes = async (app: FastifyInstance): Promise<void> => {
  // All user routes require authentication
  app.addHook('preHandler', authenticate);

  app.get('/', userController.getUsers);
  app.get('/:id', { preHandler: validate(userIdSchema) }, userController.getUser);
  app.patch('/:id', { preHandler: validate(updateUserSchema) }, userController.updateUser);
  app.delete('/:id', { preHandler: validate(userIdSchema) }, userController.deleteUser);
};

export default userRoutes;
