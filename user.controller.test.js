const request = require('supertest');
const app = require('../app');
const User = require('./user.model');
const { sequelize } = require('../db');

beforeAll(async () => {
  // Connect to the database before running the tests
  await sequelize.authenticate();
});

afterAll(async () => {
  // Disconnect from the database after running the tests
  await sequelize.close();
});

describe('User Controller', () => {
  beforeEach(async () => {
    // Clear the users table before each test
    await User.destroy({ where: {}, truncate: true });
  });

  test('GET /users should return all users', async () => {
    try {
      // Arrange
      await User.create({ name: 'John Doe', email: 'john.doe@example.com', created_at: new Date() });
      await User.create({ name: 'Jane Smith', email: 'jane.smith@example.com', created_at: new Date() });

      // Act
      const response = await request(app).get('/users');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name', 'John Doe');
      expect(response.body[0]).toHaveProperty('email', 'john.doe@example.com');
      expect(response.body[1]).toHaveProperty('id');
      expect(response.body[1]).toHaveProperty('name', 'Jane Smith');
      expect(response.body[1]).toHaveProperty('email', 'jane.smith@example.com');
    } catch (error) {
      console.error('Error in GET /users test:', error);
      console.error('Error stack:', error.stack);
      throw error;
    }
  });

  test('GET /users/:id should return a single user', async () => {
    try {
      // Arrange
      const user = await User.create({ name: 'John Doe', email: 'john.doe@example.com', created_at: new Date() });

      // Act
      const response = await request(app).get(`/users/${user.id}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', user.id);
      expect(response.body).toHaveProperty('name', 'John Doe');
      expect(response.body).toHaveProperty('email', 'john.doe@example.com');
    } catch (error) {
      console.error(`Error in GET /users/${user.id} test:`, error);
      console.error('Error stack:', error.stack);
      throw error;
    }
  });

  test('POST /users should create a new user', async () => {
    try {
      // Arrange
      const newUser = { name: 'John Doe', email: 'john.doe@example.com' };

      // Act
      const response = await request(app)
        .post('/users')
        .send(newUser);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', 'John Doe');
      expect(response.body).toHaveProperty('email', 'john.doe@example.com');
    } catch (error) {
      console.error('Error in POST /users test:', error);
      console.error('Error stack:', error.stack);
      throw error;
    }
  });

  test('PUT /users/:id should update an existing user', async () => {
    try {
      // Arrange
      const user = await User.create({ name: 'John Doe', email: 'john.doe@example.com', created_at: new Date() });
      const updatedUser = { name: 'John Smith', email: 'john.smith@example.com' };

      // Act
      const response = await request(app)
        .put(`/users/${user.id}`)
        .send(updatedUser);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', user.id);
      expect(response.body).toHaveProperty('name', 'John Smith');
      expect(response.body).toHaveProperty('email', 'john.smith@example.com');
    } catch (error) {
      console.error(`Error in PUT /users/${user.id} test:`, error);
      console.error('Error stack:', error.stack);
      throw error;
    }
  });

  test('DELETE /users/:id should delete a user', async () => {
    try {
      // Arrange
      const user = await User.create({ name: 'John Doe', email: 'john.doe@example.com', created_at: new Date() });

      // Act
      const response = await request(app).delete(`/users/${user.id}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'User deleted successfully');
    } catch (error) {
      console.error(`Error in DELETE /users/${user.id} test:`, error);
      console.error('Error stack:', error.stack);
      throw error;
    }
  });
});