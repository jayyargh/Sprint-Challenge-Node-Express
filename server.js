// express
const express = require('express');

// server
const server = express();

// middleware
server.use(express.json());

const port = 5000;

server.listen(port, () => {
  console.log(`\n== API Running on port ${port} ==\n`);
});
