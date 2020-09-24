const Carteiras = require('../models/Carteiras');

module.exports = {
  async index(req, res) {
    console.log(req)
    console.log(Carteiras)
    const carteiras = await Carteiras.findAll();

    return res.json(carteiras);
  },

  async store(req, res) {
    const { ca_crt_descricao, ca_crt_ativo } = req.body;
    const { ca_usu_codigo } = req.params

    const carteira = await Carteiras.create({ ca_usu_codigo, ca_crt_descricao, ca_crt_ativo });

    return res.json(carteira);
  },

  async show(req, res) {
    const { id } = req.params
    const carteira = await Carteiras.findByPk(id)

    res.json(carteira)
  },

  async update(req, res) {
    const { ca_crt_descricao, ca_crt_ativo } = req.body;
    const { id } = req.params

    const carteira = await Carteiras.update({ ca_crt_descricao, ca_crt_ativo }, 
      { where: { id: id } })
    
    return res.json(carteira);
  },

  async delete(req, res) {
    const { id } = req.params

    Carteiras.destroy({
      where: { id }
    }).then(deletedData => {
      console.log(`Carteira deletada ${deletedData}`)
      res.json(deletedUser)
    })
  }
};