'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ca_acoes_cotacoes', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ca_usu_codigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ca_usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ca_aco_codigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ca_acoes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ca_acc_data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ca_acc_valor: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ca_acoes_cotacoes');
  }
};
