const { Sequelize } = require('sequelize');
require('dotenv').config()

const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: "mysql",
    logging: false
}

const sequelize = new Sequelize(config);

module.exports = sequelize