const express = require('express');
const router = express.Router();
const User = require('./user.model');

// GET /users
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all users...');
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'created_at']
    });
    console.log(`Fetched ${users.length} users successfully.`);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /users/:id
router.get('/:id', async (req, res) => {
  try {
    console.log(`Fetching user with ID: ${req.params.id}`);
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'created_at']
    });

    if (!user) {
      console.log(`User with ID ${req.params.id} not found.`);
      res.status(404).json({ error: 'User not found' });
    } else {
      console.log(`Fetched user with ID ${req.params.id} successfully.`);
      res.json(user);
    }
  } catch (error) {
    console.error(`Error fetching user with ID ${req.params.id}:`, error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /users
router.post('/', async (req, res) => {
  try {
    console.log('Received POST /users request');

    // Extract name and email from request body
    const { name, email } = req.body;

    // Validate input data
    if (!name || !email) {
      console.log('Invalid request body: name and email are required');
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Create a new user
    console.log(`Creating new user with name: ${name}, email: ${email}`);
    const user = await User.create({ name, email, created_at: new Date() });
    console.log(`Created new user with ID: ${user.id}`);

    // Return the created user
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    console.error('Error stack:', error.stack);

    // Handle unique constraint violation (duplicate email)
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.log('Duplicate email error');
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Handle other errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /users/:id
router.put('/:id', async (req, res) => {
  try {
    console.log(`Received PUT /users/${req.params.id} request`);

    // Extract name and email from request body
    const { name, email } = req.body;

    // Validate input data
    if (!name || !email) {
      console.log('Invalid request body: name and email are required');
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Find the user by ID
    console.log(`Fetching user with ID: ${req.params.id}`);
    const user = await User.findByPk(req.params.id);

    if (!user) {
      console.log(`User with ID ${req.params.id} not found.`);
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's details
    console.log(`Updating user with ID: ${req.params.id}`);
    await user.update({ name, email });
    console.log(`User with ID ${req.params.id} updated successfully.`);

    // Return the updated user
    res.json(user);
  } catch (error) {
    console.error(`Error updating user with ID ${req.params.id}:`, error);
    console.error('Error stack:', error.stack);

    // Handle unique constraint violation (duplicate email)
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.log('Duplicate email error');
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Handle other errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /users/:id
router.delete('/:id', async (req, res) => {
  try {
    console.log(`Received DELETE /users/${req.params.id} request`);

    // Find the user by ID
    console.log(`Fetching user with ID: ${req.params.id}`);
    const user = await User.findByPk(req.params.id);

    if (!user) {
      console.log(`User with ID ${req.params.id} not found.`);
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user
    console.log(`Deleting user with ID: ${req.params.id}`);
    await user.destroy();
    console.log(`User with ID ${req.params.id} deleted successfully.`);

    // Return a success response
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(`Error deleting user with ID ${req.params.id}:`, error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;