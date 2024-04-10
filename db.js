const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('coding_challenge', 'root', 'fivebyfive', {
  host: 'localhost',
  dialect: 'mysql',
  // OPTIONAL for scaling, only use a single connection for development
  // pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000
  // }
});

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    console.error('Error stack:', error.stack);
    throw error;
  }
}

module.exports = { sequelize, connectToDatabase };