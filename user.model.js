const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

console.log('Creating User model...');

try {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'users',
    timestamps: false
  });

  console.log('User model created successfully.');
  module.exports = User;
} catch (error) {
  console.error('Error creating User model:', error);
  console.error('Error stack:', error.stack);
  throw error;
}