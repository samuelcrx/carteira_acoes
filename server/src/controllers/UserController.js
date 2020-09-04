const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store(req, res) {
    const { ca_usu_nome, ca_usu_login, ca_usu_cripto } = req.body;

    const user = await User.create({ ca_usu_nome, ca_usu_login, ca_usu_cripto });

    return res.json(user);
  },

  async show(req, res) {
    const { id } = req.params
    const usuario = await User.findByPk(id)

    res.json(usuario)
  },

  async update(req, res) {
    const { ca_usu_nome } = req.body;
    const { id } = req.params

    const user = await User.update({ ca_usu_nome }, { where: id })
    
    return res.json(user);
  },

  async updatePassword(req, res) {
    const { ca_usu_cripto } = req.body;
    const { id } = req.params

    const user = await User.update({ ca_usu_cripto }, { where: id })
    
    return res.json(user);
  },

  async delete(req, res) {
    const { id } = req.params

    User.destroy({
      where: { id }
    }).then(deletedUser => {
      console.log(`Usuario deletado ${deletedUser}`)
      res.json(deletedUser)
    })
  }
};