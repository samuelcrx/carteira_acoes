const { Model, DataTypes } = require('sequelize');
import bcrypt from "bcryptjs";

class ca_usuarios extends Model {
  static init(sequelize) {
    super.init({
      ca_usu_nome: DataTypes.STRING,
      ca_usu_login: {
        type: DataTypes.STRING,
        unique: true
      },
      ca_usu_cripto: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('ca_usu_cripto', bcrypt.hashSync(value, 8))
        }
      }

    }, {
      sequelize
    })
    return this;
  }
  checkPassword(password) {
    return bcrypt.compare(password, this.ca_usu_cripto);
  }
}

module.exports = ca_usuarios;
