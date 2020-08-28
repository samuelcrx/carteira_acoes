const { Model, DataTypes } = require('sequelize');

class ca_usuarios extends Model {
  static init(sequelize) {
    super.init({
      ca_usu_nome: DataTypes.STRING,
      ca_usu_login: DataTypes.STRING,
      ca_usu_cripto: DataTypes.STRING
    }, {
      sequelize
    })
  }

  // static associate(models) {
  //   this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
  //   this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' });
  // }
}

module.exports = ca_usuarios;