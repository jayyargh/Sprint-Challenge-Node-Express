const express = require('express');
const helmet = require('helmet');

const actionRoutes = require('./routes/actionRouter');
const projectRoutes = require('./routes/projectRouter');

const { logger } = require('./middleware');

// server
const server = express();

// middleware
server.use(express.json());
server.use(helmet());
server.use(logger);

// route handlers
server.use('/api/projects', projectRoutes);
server.use('/api/actions', actionRoutes);

// server stuff, you wouldn't get it
server.get('/', (req, res) => {
  res.json({ api: 'running' });
});

const port = 5000;

server.listen(port, () => {
  console.log(`\n== API Running on port ${port} ==\n`);
});
