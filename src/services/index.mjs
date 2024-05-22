import AssistantService from './assistant.service.mjs';
import MessageService from './message.service.mjs';
import ThreadService from './thread.service.mjs';

const assistantService = new AssistantService();
const threadService = new ThreadService();
const messageService = new MessageService();

export { assistantService, threadService, messageService };
