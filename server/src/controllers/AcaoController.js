const Acao = require('../models/Acoes');

module.exports = {
  async index(req, res) {
    const acoes = await Acao.findAll();

    return res.json(acoes);
  },

  async store(req, res) {
    const { ca_aco_ticker, ca_aco_nome, ca_aco_ativo } = req.body;

    const acao = await Acao.create({ ca_aco_ticker, ca_aco_nome, ca_aco_ativo });
    console.log(acao)

    return res.json(acao);
  },

  async show(req, res) {
    const { id } = req.params
    const acao = await Acao.findByPk(id)

    res.json(acao)
  },

  async update(req, res) {
    const { ca_aco_ticker, ca_aco_nome, ca_aco_ativo } = req.body;
    const { id } = req.params

    const acao = await Acao.update({ ca_aco_ticker, ca_aco_nome, ca_aco_ativo }, { where: { id: id } })
    
    return res.json(acao);
  },

  async delete(req, res) {
    const { id } = req.params

    Acao.destroy({
      where: { id: id }
    }).then(deletedAction => {
      console.log(`Ação deletada ${deletedAction}`)
      res.json(deletedAction)
    })
  }
};