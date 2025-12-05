import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { getUser, getAllUsers } from '../services/metricsService';

const router = Router();

router.get('/:userId', authenticate, async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ error: 'userId required' });
  const metrics = await getUser(userId);
  return res.json({ userId, metrics });
});

router.get('/admin', authenticate, async (req: Request, res: Response) => {
  const all = await getAllUsers();
  return res.json(all);
});

export default router;
