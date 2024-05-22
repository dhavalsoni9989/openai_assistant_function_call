import OpenAI from 'openai';
import searchProductsByKeyword from './http.service.mjs';

export default class ThreadService {
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
      const thread = await this.openAi.beta.threads.create();
      return thread;
    } catch (error) {
      throw error;
    }
  }

  async retrieve(threadId) {
    try {
      const myThread = await this.openAi.beta.threads.retrieve(threadId);
      return myThread;
    } catch (error) {
      throw error;
    }
  }

  async handleRequiresAction(run, threadId) {
    // Check if there are tools that require outputs
    if (
      run.required_action &&
      run.required_action.submit_tool_outputs &&
      run.required_action.submit_tool_outputs.tool_calls
    ) {
      let keyword = '';

      run.required_action.submit_tool_outputs.tool_calls.forEach((tool) => {
        if (tool.function.name === 'fetchProductsFromApi') {
          const args = JSON.parse(tool.function.arguments);
          keyword = args.keyword;
        }
      });

      const dpResponse = await searchProductsByKeyword(keyword);

      // Loop through each tool in the required action section
      const toolOutputs =
        run.required_action.submit_tool_outputs.tool_calls.map((tool) => {
          if (tool.function.name === 'fetchProductsFromApi') {
            return {
              tool_call_id: tool.id,
              output: dpResponse,
            };
          }
        });

      // Submit all tool outputs at once after collecting them in a list
      if (toolOutputs.length > 0) {
        run = await this.openAi.beta.threads.runs.submitToolOutputsAndPoll(
          threadId,
          run.id,
          { tool_outputs: toolOutputs },
        );
        console.log('Tool outputs submitted successfully.');
      } else {
        console.log('No tool outputs to submit.');
      }

      // Check status after submitting tool outputs
      return this.handleRunStatus(run, threadId);
    }
  }

  async handleRunStatus(run, threadId) {
    // Check if the run is completed
    if (run.status === 'completed') {
      let messages = await this.openAi.beta.threads.messages.list(threadId);
      return messages.data;
    } else if (run.status === 'requires_action') {
      return await this.handleRequiresAction(run, threadId);
    } else {
      console.error('Run did not complete:', run);
    }
  }

  async threadRun(assistantId, threadId) {
    let run = await this.openAi.beta.threads.runs.createAndPoll(threadId, {
      assistant_id: assistantId,
    });
    const runRes = await this.handleRunStatus(run, threadId);
    return runRes;
  }
}
