const express = require('express');
const app = express();
const port = 3000;

// Log server start
console.log('Starting server...');

// Require the necessary modules
const { connectToDatabase } = require('./db');
const User = require('./user.model');
const userRouter = require('./user.controller');

// Connect to the database
connectToDatabase()
  .then(() => {
    console.log('Connected to the database successfully');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    console.error('Error stack:', error.stack);
  });

// Mount the user API routes
app.use('/users', userRouter);

app.get('/ping', (req, res) => {
  console.log('Received /ping request');
  try {
    res.send('pong');
    console.log('Responded with "pong"');
  } catch (error) {
    console.error('Error handling /ping request:', error);
    console.error('Error stack:', error.stack);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});