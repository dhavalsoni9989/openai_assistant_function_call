import OpenAI from 'openai';

export default class AssistantService {
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
  async create() {
    try {
      const assistant = await this.openAi.beta.assistants.create({
        name: 'Assistant func fetch dummy products calling',
        model: 'gpt-4o',
        instructions:
          'You are a product filter bot. Use the provided functions to fetch the products.',
        tools: [
          {
            type: 'function',
            function: {
              name: 'fetchProductsFromApi',
              description: 'Fetch the Products by keyword in API',
              parameters: {
                type: 'object',
                properties: {
                  keyword: {
                    type: 'string',
                    description:
                      'The keyword, e.g., phone, mobile, Samsung, OPPO and MacBook',
                  },
                },
                required: ['keyword'],
              },
            },
          },
        ],
      });
      return assistant;
    } catch (error) {
      throw error;
    }
  }
}
