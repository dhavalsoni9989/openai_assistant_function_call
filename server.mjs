import express from 'express';
import bodyParser from 'body-parser';
import routes from './src/routes/index.mjs';

const app = express();

app.use(bodyParser.json());
const port = process.env.PORT;

app.use('/', routes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const unexpectedErrorHandler = (error) => {
  console.error(error);
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.info('SIGTERM received');
});

/* app.post('/assistant', async (req, res) => {
  const assRes = await createAssistant();
  res.json(assRes);
});

app.post('/thread', async (req, res) => {
  res.json(thread);
});

app.get('/thread', async (req, res) => {
  const { threadId } = req.query;

  res.json(myThread);
});

app.post('/message', async (req, res) => {
  const { threadId, msg } = req.body;
  res.json(message);
});

app.post('/run', async (req, res) => {
  const { assistantId, threadId } = req.body;
  let run = await openai.beta.threads.runs.createAndPoll(threadId, {
    assistant_id: assistantId,
  });
  const runRes = await handleRunStatus(run, threadId);

  res.json(runRes);
});

app.get('/messages', async (req, res) => {
  const { threadId } = req.query;
  res.json(messages);
}); */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
