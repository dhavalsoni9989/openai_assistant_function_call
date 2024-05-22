import { Router } from 'express';

import { assistantController } from '../controllers/index.mjs';

const assistantRoutes = Router();

assistantRoutes.route('/').post(assistantController.create);

export default assistantRoutes;
