const AcaoCotacao = require("../models/AcoesCotacoes");
const User = require("../models/User");
const Acao = require("../models/Acoes");

module.exports = {
  async index(req, res) {
    const { userId, acoCodigo } = req.params
    
    const acoesCotacoes = await AcaoCotacao.findAll({
      include: [
        {
          model: User,
          as: "usuario_id",
          attributes: ["id", "ca_usu_nome"],
        },
        {
          model: Acao,
          as: "acao_id",
          attributes: ["id", "ca_aco_ticker", "ca_aco_nome"]
        },
      ],
      where: { ca_usu_codigo: userId, ca_aco_codigo: acoCodigo }
    });

    return res.json(acoesCotacoes);
  },

  async store(req, res) {
    const {
      acao_id,
      ca_acc_valor,
    } = req.body;

    const { ca_usu_codigo } = req.params

    const ca_aco_codigo = acao_id.id

    console.log('param', req.body)
    console.log('id', req.params)

    const acaoCotacao = await AcaoCotacao.create({
      ca_usu_codigo,
      ca_aco_codigo,
      ca_acc_valor,
    });

    return res.json({});
  },

  async show(req, res) {
    const { id } = req.params;
    const acaoCotacao = await AcaoCotacao.findByPk(id);
    if (acaoCotacao) {
      const user = await User.findByPk(acaoCotacao.ca_usu_codigo);

      if (user) {
        const { id, ca_usu_nome } = user;
        acaoCotacao.ca_usu_codigo = { id, ca_usu_nome };
      }

      const acao = await Acao.findByPk(acaoCotacao.ca_aco_codigo);
      if (acao) {
        const { id, ca_aco_ticker, ca_aco_nome } = acao;
        acaoCotacao.ca_aco_codigo = {
          id,
          ca_aco_ticker,
          ca_aco_nome,
        };
      }
      res.json(acaoCotacao);
    } else {
      res.json({});
    }
  },

  async update(req, res) {
    const { ca_aco_codigo, ca_acc_data, ca_acc_valor } = req.body;
    const { id } = req.params;

    const acaoCotacao = await AcaoCotacao.update(
      { ca_aco_codigo, ca_acc_data, ca_acc_valor },
      { where: { id: id } }
    );

    return res.json(acaoCotacao);
  },

  async delete(req, res) {
    const { id } = req.params;

    AcaoCotacao.destroy({
      where: { id },
    }).then((deletedAction) => {
      console.log(`Ação Cotação deletada ${deletedAction}`);
      res.json(deletedAction);
    });
  },
};
