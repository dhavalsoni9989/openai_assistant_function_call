import { Router } from 'express';

import { messageController } from '../controllers/index.mjs';

const assistantRoutes = Router();

assistantRoutes.route('/').post(messageController.create);
assistantRoutes.route('/').get(messageController.list);

export default assistantRoutes;
