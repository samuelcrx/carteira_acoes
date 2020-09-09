const Log = require('../models/Log');

module.exports = {
  async index(req, res) {
    const logs = await User.findAll();

    return res.json(logs);
  },

  async store(req, res) {
    const { ca_usu_login, ca_usu_codigo } = req.body;

    const log = await Log.create({ ca_usu_codigo, ca_usu_login });

    return res.json(log);
  }
};