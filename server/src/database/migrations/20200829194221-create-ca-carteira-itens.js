'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ca_carteira_itens', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ca_crt_codigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ca_carteiras', key: 'id' },
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
      ca_cri_quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ca_cri_valor_medio: {
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
    return queryInterface.dropTable('ca_carteira_itens');
  }
};
