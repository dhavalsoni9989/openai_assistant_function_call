import { Router } from 'express';

import { threadController } from '../controllers/index.mjs';

const router = Router();

router.route('/').get(threadController.list);
router.route('/').post(threadController.create);
router.route('/run').post(threadController.run);

export default router;
