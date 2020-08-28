'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ca_carteiras', {
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
      ca_crt_descricao: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      ca_crt_ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ca_carteiras');
  }
};
