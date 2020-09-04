const AcaoCotacao = require('../models/AcoesCotacoes');

module.exports = {
  async index(req, res) {
    const acoesCotacoes = await Acao.findAll();

    return res.json(acoesCotacoes);
  },

  async store(req, res) {
    const { ca_usu_codigo, ca_aco_codigo, ca_acc_data, ca_acc_valor } = req.body;

    const acaoCotacao = await AcaoCotacao.create({ ca_usu_codigo, ca_aco_codigo, ca_acc_data, ca_acc_valor });

    return res.json(acaoCotacao);
  },

  async show(req, res) {
    const { id } = req.params
    const acaoCotacao = await AcaoCotacao.findByPk(id)

    res.json(acaoCotacao)
  },

  async update(req, res) {
    const { ca_acc_data, ca_acc_valor } = req.body;
    const { id } = req.params

    const acaoCotacao = await AcaoCotacao.update({ ca_acc_data, ca_acc_valor }, { where: id })
    
    return res.json(acaoCotacao);
  },

  async delete(req, res) {
    const { id } = req.params

    AcaoCotacao.destroy({
      where: { id }
    }).then(deletedAction => {
      console.log(`Ação Cotação deletada ${deletedAction}`)
      res.json(deletedAction)
    })
  }
};