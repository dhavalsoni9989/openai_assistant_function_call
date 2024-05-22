import { Router } from 'express';
import assistantRoutes from './assistant.routes.mjs';
import messageRoutes from './message.routes.mjs';
import threadRoutes from './thread.routes.mjs';

const router = Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

router.use('/assistant', assistantRoutes);
router.use('/messages', messageRoutes);
router.use('/thread', threadRoutes);

export default router;
