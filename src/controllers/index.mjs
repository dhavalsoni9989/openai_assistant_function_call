//import OpenAIController from './openai.controller';
import AssistantController from './assistant.controller.mjs';
import MessageController from './message.controller.mjs';
import ThreadController from './thread.controller.mjs';

const messageController = new MessageController();
const assistantController = new AssistantController();
const threadController = new ThreadController();

export { assistantController, messageController, threadController };
