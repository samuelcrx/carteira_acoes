const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Log = require('../models/Log');
const Carteiras = require('../models/Carteiras');
const Acoes = require('../models/Acoes');
const AcoesCotacoes = require('../models/AcoesCotacoes');
const CarteiraItens = require('../models/CarteiraItens');
const CarteiraMovimento = require('../models/CarteiraMovimento');

// Start da conexão com o Postgres
const connection = new Sequelize(dbConfig);

// Conecta o model com o banco
User.init(connection);
Log.init(connection);
Carteiras.init(connection);
Acoes.init(connection);
AcoesCotacoes.init(connection);
CarteiraItens.init(connection);
CarteiraMovimento.init(connection);

// Cria as associations de foreign keys
Log.associate(connection.models);
Carteiras.associate(connection.models);
AcoesCotacoes.associate(connection.models);
CarteiraItens.associate(connection.models);
CarteiraMovimento.associate(connection.models);

module.exports = connection;