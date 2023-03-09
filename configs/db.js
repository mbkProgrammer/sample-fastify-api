const { Sequelize } = require('sequelize');

const db = new Sequelize('mbk-api', 'postgres', 'mk84mk84', {
  host: 'localhost',
  dialect: 'postgres',
});

try {
  await db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = db;
