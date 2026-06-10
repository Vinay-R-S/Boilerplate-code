import { Request, Response, Router } from 'express';

import authRoutes from './auth.routes';
import userRoutes from './user.routes';

const router = Router();

// Health check
router.get('/health', (_req: Request, res: Response) => {
  res.json({ success: true, message: 'Server is healthy', timestamp: new Date().toISOString() });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
