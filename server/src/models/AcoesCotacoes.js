const { Model, DataTypes } = require('sequelize');

class ca_acoes_cotacoes extends Model {
  static init(sequelize) {
    super.init({
      ca_usu_codigo: DataTypes.INTEGER, //Foreign Key 01
      ca_aco_codigo: DataTypes.INTEGER, // Foreign Key 02
      ca_acc_data: DataTypes.DATE,
      ca_acc_valor: DataTypes.DOUBLE,
    }, {
      sequelize,
      tableName: 'ca_acoes_cotacoes'
    })
    return this;
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'ca_usu_codigo', as: 'ca_usu_codigo' });
    this.belongsTo(models.Acoes, { foreignKey: 'ca_aco_codigo', as: 'ca_aco_codigo' });
  }
}

module.exports = ca_acoes_cotacoes;