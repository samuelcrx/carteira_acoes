'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ca_usuarios', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
      },
      ca_usu_nome: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ca_usu_login: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      ca_usu_cripto: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      reset_password: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ca_usuarios');
  }
};
