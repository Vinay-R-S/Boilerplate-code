import { Router } from 'express';

import * as userController from '../controllers/user.controller';
import { authenticate } from '../middlewares/authenticate';
import { validate } from '../middlewares/validate';
import { updateUserValidation, userIdValidation } from '../validators/user.validators';

const router = Router();

// All user routes require authentication
router.use(authenticate);

router.get('/', userController.getUsers);
router.get('/:id', validate(userIdValidation), userController.getUser);
router.patch('/:id', validate(updateUserValidation), userController.updateUser);
router.delete('/:id', validate(userIdValidation), userController.deleteUser);

export default router;
