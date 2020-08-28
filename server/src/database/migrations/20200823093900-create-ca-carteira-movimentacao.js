'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('ca_carteira_movimentacao', {
        ca_usu_codigo: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'ca_usuarios', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
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
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        ca_crm_compra_venda: {
          type: Sequelize.STRING(1),
          allowNull: true,
        },
        ca_crm_data: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        ca_crm_valor: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ca_carteira_movimentacao');
  }
};
