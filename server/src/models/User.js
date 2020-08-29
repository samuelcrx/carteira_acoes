const { Model, DataTypes } = require('sequelize');

class ca_usuarios extends Model {
  static init(sequelize) {
    super.init({
      ca_usu_nome: DataTypes.STRING,
      ca_usu_login: DataTypes.STRING,
      ca_usu_cripto: DataTypes.STRING
    }, {
      sequelize,
    })
    return this;
  }
}

module.exports = ca_usuarios;