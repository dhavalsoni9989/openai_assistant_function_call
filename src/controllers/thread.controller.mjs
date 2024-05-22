import httpStatus from 'http-status';
import { threadService } from '../services/index.mjs';

export default class ThreadController {
  /**
   * Get user list
   * @public
   */
  async list(req, res, next) {
    try {
      const { threadId } = req.query;
      const thread = await threadService.retrieve(threadId);
      res.json(thread);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new user
   * @public
   */
  async create(req, res, next) {
    try {
      const thread = await threadService.create();
      res.status(httpStatus.CREATED).json(thread);
    } catch (error) {
      next(error);
    }
  }

  async run(req, res, next) {
    try {
      const { assistantId, threadId } = req.body;
      const thread = await threadService.threadRun(assistantId, threadId);
      res.status(httpStatus.OK).json(thread);
    } catch (error) {
      next(error);
    }
  }
}
