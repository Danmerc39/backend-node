const { config } = require('../config/config');
const { Sequelize } = require('sequelize');
const setupModels = require('../db/models');

// Metodo de conexion por URI
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const connectionString = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres'
});

setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;