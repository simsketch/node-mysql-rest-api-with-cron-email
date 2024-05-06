const { sequelize } = require('./db');
const User = require('./user.model');
const { describe, expect, test } = require('@jest/globals');

describe('Database Tests', () => {
  // Test the database connection
  test('should connect to the database', async () => {
    try {
      await sequelize.authenticate();
      console.log('Connected to the database successfully');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      console.error('Error stack:', error.stack);
      throw error;
    }
  });

  // Test the User model
  test('should define the User model correctly', () => {
    try {
      const user = User.build({
        name: 'John Doe',
        email: 'john.doe@example.com',
        created_at: new Date()
      });

      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john.doe@example.com');
      expect(user.created_at).toBeInstanceOf(Date);
    } catch (error) {
      console.error('Error defining the User model:', error);
      console.error('Error stack:', error.stack);
      throw error;
    }
  });

  // Test the database schema
  test('should match the expected database schema', async () => {
    try {
      const tableDefinition = await sequelize.getQueryInterface().describeTable('users');
      expect(tableDefinition).toEqual({
        id: {
          type: 'INTEGER',
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: 'VARCHAR(255)',
          allowNull: false
        },
        email: {
          type: 'VARCHAR(255)',
          allowNull: false,
          unique: true
        },
        created_at: {
          type: 'TIMESTAMP',
          allowNull: false
        }
      });
    } catch (error) {
      console.error('Error validating the database schema:', error);
      console.error('Error stack:', error.stack);
      throw error;
    }
  });
});