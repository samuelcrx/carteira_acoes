const { Model, DataTypes } = require('sequelize');

class ca_carteira_itens extends Model {
  static init(sequelize) {
    super.init({
      ca_crt_codigo: DataTypes.INTEGER, //Foreign Key 01
      ca_aco_codigo: DataTypes.INTEGER, // Foreign Key 02
      ca_cri_quantidade: DataTypes.INTEGER,
      ca_cri_valor_medio: DataTypes.DOUBLE,
    }, {
      sequelize,
      tableName: 'ca_carteira_itens'
    })
    return this;
  }
  static associate(models) {
    this.belongsTo(models.ca_carteiras, { foreignKey: 'ca_crt_codigo', as: 'carteira_id' });
    this.belongsTo(models.ca_acoes, { foreignKey: 'ca_aco_codigo', as: 'acao_id' });
  }
}

module.exports = ca_carteira_itens;