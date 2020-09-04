const { Model, DataTypes } = require('sequelize');

class ca_carteira_movimento extends Model {
  static init(sequelize) {
    super.init({
      ca_crt_codigo: DataTypes.INTEGER, //Foreign Key 01
      ca_aco_codigo: DataTypes.INTEGER, // Foreign Key 02
      ca_crm_compra_venda: DataTypes.STRING(1),
      ca_crm_data: DataTypes.DATE,
      ca_crm_valor: DataTypes.DOUBLE,
    }, {
      sequelize,
      tableName: 'ca_carteira_movimento'
    })
    return this;
  }
  static associate(models) {
    this.belongsTo(models.ca_carteiras, { foreignKey: 'ca_crt_codigo', as: 'carteira_id' });
    this.belongsTo(models.ca_acoes, { foreignKey: 'ca_aco_codigo', as: 'acao_id' });
  }
}

module.exports = ca_carteira_movimento;