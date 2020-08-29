const { Model, DataTypes } = require('sequelize');

class ca_acoes extends Model {
  static init(sequelize) {
    super.init({
      ca_aco_ticker: DataTypes.STRING,
      ca_aco_nome: DataTypes.STRING,
      ca_aco_ativo: DataTypes.BOOLEAN
    }, {
      sequelize,
      tableName: 'ca_acoes'
    })
    return this;
  }
}

module.exports = ca_acoes;