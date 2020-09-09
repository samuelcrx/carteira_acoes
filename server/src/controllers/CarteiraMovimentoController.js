const CarteiraMovimento = require('../models/CarteiraMovimento');
const Carteira = require('../models/Carteiras');
const Acao = require('../models/Acoes');

module.exports = {
  async index(req, res) {
    const carteiraMovimentos = await CarteiraMovimento.findAll({
      include: [
        {
          model: Carteira,
          as: 'carteira_id',
          attributes: ['id', 'ca_crt_descricao']
        },
        {
          model: Acao,
          as: 'acao_id',
          attributes: ['id', 'ca_aco_ticker', 'ca_aco_nome']
        }
      ]
    });

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

    if (carteiraMovimentacao) {
      const carteira = await Carteira.findByPk(carteiraMovimentacao.ca_crt_codigo)
      
      if (carteira) {
        const { id, ca_crt_descricao } = carteira;

        carteiraMovimentacao.ca_crt_codigo = {
          id, ca_crt_descricao
        }
      }

      const acao = await Acao.findByPk(carteiraMovimentacao.ca_aco_codigo)

      if (acao) {
        const { id, ca_aco_ticker, ca_aco_nome } = acao;

        carteiraMovimentacao.ca_aco_codigo = {
          id,
          ca_aco_ticker,
          ca_aco_nome
        }
      }
      res.json(carteiraMovimentacao)
    }
    
    res.json({})
  },

  async update(req, res) {
    const { ca_aco_codigo, ca_crm_compra_venda, ca_crm_data, ca_crm_valor } = req.body;
    const { id } = req.params

    const updateMovimento = await CarteiraMovimento.update({ ca_aco_codigo, ca_crm_compra_venda, ca_crm_data, ca_crm_valor }, { where: { id } })
    
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