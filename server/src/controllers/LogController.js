const Log = require('../models/Log');

module.exports = {
  async index(req, res) {
    const logs = await User.findAll();

    return res.json(logs);
  },

  async store(req, res) {
    const { userId } = req.params
    const { ca_log_ip } = req.body;

    const ca_usu_codigo = userId

    const log = await Log.create({ ca_usu_codigo, ca_log_ip });

    return res.json(log);
  }
};