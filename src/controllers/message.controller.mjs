import httpStatus from 'http-status';
import { messageService } from '../services/index.mjs';

export default class MessageController {
  /**
   * Get Message list
   * @public
   */
  async list(req, res, next) {
    try {
      const { threadId } = req.query;
      const messages = await messageService.list(threadId);
      res.json(messages);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new message
   * @public
   */
  async create(req, res, next) {
    try {
      const { threadId, msg } = req.body;
      const message = await messageService.create(threadId, msg);
      res.status(httpStatus.CREATED).json(message);
    } catch (error) {
      next(error);
    }
  }
}
