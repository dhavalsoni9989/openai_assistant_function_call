import httpStatus from 'http-status';
import { assistantService } from '../services/index.mjs';

export default class AssistantController {
  /**
   * Create new user
   * @public
   */
  async create(req, res, next) {
    try {
      const assistantRes = await assistantService.create();
      res.status(httpStatus.CREATED).json(assistantRes);
    } catch (error) {
      next(error);
    }
  }
}
