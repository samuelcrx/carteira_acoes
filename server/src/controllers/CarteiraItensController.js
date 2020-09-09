const CarteiraItens = require('../models/CarteiraItens');
const Carteira = require('../models/Carteiras');
const Acao = require('../models/Acoes');

module.exports = {
  async index(req, res) {
    const carteiraItens = await CarteiraItens.findAll({
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

    return res.json(carteiraItens);
  },

  async store(req, res) {
    const { ca_crt_codigo, ca_aco_codigo, ca_cri_quantidade, ca_cri_valor_medio } = req.body;

    const carteiraItem = await CarteiraItens.create({ ca_crt_codigo, ca_aco_codigo, ca_cri_quantidade, ca_cri_valor_medio });

    return res.json(carteiraItem);
  },

  async show(req, res) {
    const { id } = req.params
    const carteiraItem = await CarteiraItens.findByPk(id)
    if (carteiraItem) {
      const carteira = await Carteira.findByPk(carteiraItem.ca_crt_codigo)
      
      if (carteira) {
        const { id, ca_crt_descricao } = carteira;

        carteiraItem.ca_crt_codigo = {
          id, ca_crt_descricao
        }
      }

      const acao = await Acao.findByPk(carteiraItem.ca_aco_codigo)

      if (acao) {
        const { id, ca_aco_ticker, ca_aco_nome } = acao;

        carteiraItem.ca_aco_codigo = {
          id,
          ca_aco_ticker,
          ca_aco_nome
        }
      }
      res.json(carteiraItem)
    } else {
      res.json({})
    }

  },

  async update(req, res) {
    const { ca_aco_codigo, ca_cri_quantidade, ca_cri_valor_medio } = req.body;
    const { id } = req.params

    const carteiraItem = await CarteiraItens.update({ ca_aco_codigo, ca_cri_quantidade, ca_cri_valor_medio }, { where: { id: id } })
    
    return res.json(carteiraItem);
  },

  async updateValor(req, res) {
    const { ca_cri_valor_medio } = req.body;
    const { id } = req.params

    const carteiraItem = await CarteiraItens.update({ ca_cri_valor_medio }, { where: { id: id } })
    
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