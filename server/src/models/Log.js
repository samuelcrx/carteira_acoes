const { Model, DataTypes } = require('sequelize');

class ca_log extends Model {
  static init(sequelize) {
    super.init({
      ca_usu_codigo: DataTypes.INTEGER,
      ca_log_ip: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'ca_log'
    })
    return this;
  }

  static associate(models) {
    this.belongsTo(models.ca_usuarios, { foreignKey: 'ca_usu_codigo', as: 'usuario_id'});
  }
}

module.exports = ca_log;