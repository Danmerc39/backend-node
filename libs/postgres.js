//Conexion a la base de datos directamente con pg, sin ORM

const { Client } = require('pg');

async function getConnection(){
    const client = new Client({
        host: config.dbHost,
        port: config.dbPort,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbName,
    });
    await client.connect();
    return client;
}

module.exports = getConnection;