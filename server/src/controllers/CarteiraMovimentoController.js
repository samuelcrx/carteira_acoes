const CarteiraMovimento = require('../models/CarteiraMovimento');

module.exports = {
  async index(req, res) {
    const carteiraMovimentos = await CarteiraMovimento.findAll();

    return res.json(carteiraMovimentos);
  },

  async store(req, res) {
    const { ca_crt_codigo, ca_aco_codigo, ca_crm_compra_venda, ca_crm_data, ca_crm_valor } = req.body;

    const carteiraMovimentada = await CarteiraMovimento.create({ ca_crt_codigo, ca_aco_codigo, ca_crm_compra_venda, ca_crm_data, ca_crm_valor });

    return res.json(carteiraMovimentada);
  },

  async show(req, res) {
    const { id } = req.params
    const carteiraMovimentacao = await CarteiraMovimento.findByPk(id)

    res.json(carteiraMovimentacao)
  },

  async update(req, res) {
    const { ca_crm_compra_venda, ca_crm_data, ca_crm_valor } = req.body;
    const { id } = req.params

    const updateMovimento = await CarteiraMovimento.update({ ca_crm_compra_venda, ca_crm_data, ca_crm_valor }, { where: id })
    
    return res.json(updateMovimento);
  },

  async delete(req, res) {
    const { id } = req.params

    CarteiraMovimento.destroy({
      where: { id }
    }).then(deletedMove => {
      console.log(`Ação Cotação deletada ${deletedMove}`)
      res.json(deletedMove)
    })
  }
};