import OpenAI from 'openai';

export default class MessageService {
  openAi = null;
  constructor() {
    this.openAi = new OpenAI({
      apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
    });
  }
  /**
   *
   * @returns
   */
  async create(threadId, msg) {
    try {
      const message = await this.openAi.beta.threads.messages.create(threadId, {
        role: 'user',
        content: msg,
      });
      return message;
    } catch (error) {
      throw error;
    }
  }

  async list(threadId) {
    try {
      let messages = await this.openAi.beta.threads.messages.list(threadId);
      return messages;
    } catch (error) {
      throw error;
    }
  }
}
