const { Model, DataTypes } = require('sequelize');

class ca_carteiras extends Model {
  static init(sequelize) {
    super.init({
      ca_usu_codigo: DataTypes.INTEGER,
      ca_crt_descricao: DataTypes.STRING,
      ca_crt_ativo: DataTypes.BOOLEAN,

    }, {
      sequelize,
      tableName: 'ca_carteiras'
    })
    return this;
  }

  static associate(models) {
    this.belongsTo(models.ca_usuarios, { foreignKey: 'ca_usu_codigo', as: 'usuario_id' });
  }
}

module.exports = ca_carteiras;