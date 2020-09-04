const CarteiraItens = require('../models/CarteiraItens');

module.exports = {
  async index(req, res) {
    const carteiraItens = await CarteiraItens.findAll();

    return res.json(carteiraItens);
  },

  async store(req, res) {
    const { ca_crt_codigo, ca_aco_codigo, ca_cri_quantidade, ca_cri_valor_medio, ca_cri_data_atualizacao, ca_acc_valor } = req.body;

    const carteiraItem = await CarteiraItens.create({ ca_crt_codigo, ca_aco_codigo, ca_cri_quantidade, ca_cri_valor_medio, ca_cri_data_atualizacao, ca_acc_valor });

    return res.json(carteiraItem);
  },

  async show(req, res) {
    const { id } = req.params
    const carteiraItem = await CarteiraItens.findByPk(id)

    res.json(carteiraItem)
  },

  async update(req, res) {
    const { ca_cri_quantidade, ca_cri_valor_medio, ca_cri_data_atualizacao, ca_acc_valor } = req.body;
    const { id } = req.params

    const carteiraItem = await CarteiraItens.update({ ca_cri_quantidade, ca_cri_valor_medio, ca_cri_data_atualizacao, ca_acc_valor }, { where: id })
    
    return res.json(carteiraItem);
  },

  async delete(req, res) {
    const { id } = req.params

    CarteiraItens.destroy({
      where: { id }
    }).then(deletedItem => {
      console.log(`Ação Cotação deletada ${deletedItem}`)
      res.json(deletedItem)
    })
  }
};