//Conexion a la base de datos directamente con pg, sin ORM por medio de un pool
const { Pool } = require('pg');
const { config } = require('../config/config');


// Metodo de conexion por URI
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const connectionString = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const pool = new Pool({ connectionString })


// Metodo de conexion por variables de conexion
// const pool = new Pool({
//     host: config.dbHost,
//     port: config.dbPort,
//     user: config.dbUser,
//     password: config.dbPassword,
//     database: config.dbName,
// });

module.exports = pool;