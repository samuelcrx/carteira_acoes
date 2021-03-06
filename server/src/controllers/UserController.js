import jwt from "jsonwebtoken";
import * as Yup from "yup";

import authConfig from "../config/auth";

const User = require("../models/User");
const Log = require("../models/Log");

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store(req, res) {
    const { ca_usu_nome, ca_usu_login, ca_usu_cripto } = req.body;

    const user = await User.create({
      ca_usu_nome,
      ca_usu_login,
      ca_usu_cripto,
    });

    return res.json(user);
  },

  async show(req, res) {
    const { id } = req.params;
    const usuario = await User.findByPk(id);
    usuario.dataValues.ca_usu_cripto = "";

    res.json(usuario);
  },

  async update(req, res) {
    const { ca_usu_nome, ca_usu_login, id } = req.body;

    const userEdit = await User.update(
      { ca_usu_nome, ca_usu_login },

      { where: { id } }
    );

    return res.json(userEdit);
  },

  async updatePassword(req, res) {
    const { ca_usu_cripto } = req.body;
    const { id } = req.params;
    const reset_password = false;

    const user = await User.update(
      { ca_usu_cripto, reset_password },
      { where: { id: id } }
    );
    return res.json(user);
  },

  async delete(req, res) {
    const { id } = req.params;

    User.destroy({
      where: { id },
    }).then((deletedUser) => {
      res.json(deletedUser);
    });
  },

  async login(req, res) {
    const schema = Yup.object().shape({
      ca_usu_login: Yup.string().email().required(),
      ca_usu_cripto: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ message: "Validation fails" });
    }

    const { ca_usu_login, ca_usu_cripto } = req.body;

    const user = await User.findOne({
      where: {
        ca_usu_login,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!(await user.checkPassword(ca_usu_cripto))) {
      return res.status(400).json({ message: "Check your password" });
    }

    const { id, ca_usu_nome, reset_password } = user;

    let ca_log_ip = req.connection.remoteAddress;
    let ca_usu_codigo = id;

    const log = await Log.create({ ca_usu_codigo, ca_log_ip });

    return res.json({
      user: {
        id,
        ca_usu_login,
        ca_usu_nome,
        reset_password,
      },
      // Primeiro parametro é o payload, o segundo é a assinatura
      token: jwt.sign({ id, ca_usu_nome }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  },
};
