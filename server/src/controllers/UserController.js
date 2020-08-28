const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store(req, res) {
    const { ca_UsuNome, ca_UsuLogin, ca_UsuCripto } = req.body;

    console.log('cheguei', req.body)

    const user = await User.create({ ca_UsuNome, ca_UsuLogin, ca_UsuCripto });

    return res.json(user);
  }
};