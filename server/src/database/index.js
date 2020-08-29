const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Log = require('../models/Log');
const Carteiras = require('../models/Carteiras');

// Start da conexão com o Postgres
const connection = new Sequelize(dbConfig);

// Conecta o model com o banco
User.init(connection);
Log.init(connection);
Carteiras.init(connection);

// Cria as associations de foreign keys
Log.associate(connection.models);
Carteiras.associate(connection.models);

module.exports = connection;