const AcaoCotacao = require("../models/AcoesCotacoes");
const CarteiraItens = require("../models/CarteiraItens");
const User = require("../models/User");
const Acao = require("../models/Acoes");
import app from "../app";

module.exports = {
  async index(req, res) {
    const { userId, acoCodigo } = req.params;

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
          attributes: ["id", "ca_aco_ticker", "ca_aco_nome"],
        },
      ],
      where: { ca_usu_codigo: userId, ca_aco_codigo: acoCodigo },
    });

    return res.json(acoesCotacoes);
  },

  async store(req, res) {
    const { acao_id, ca_acc_valor } = req.body;
    const { carteiraId, email } = req.query;

    const { ca_usu_codigo } = req.params;

    const ca_aco_codigo = acao_id.id;

    const acaoCotacao = await AcaoCotacao.create({
      ca_usu_codigo,
      ca_aco_codigo,
      ca_acc_valor,
    });

    const carteiraItem = await CarteiraItens.findOne({
      where: { ca_crt_codigo: carteiraId, ca_aco_codigo },
    })

    console.log('Iteeem ', carteiraItem.dataValues)
    if((ca_acc_valor <= carteiraItem.dataValues.ca_crt_min) || (ca_acc_valor >= carteiraItem.dataValues.ca_crt_max)) {
      app.email.sendCotacao(email, ca_acc_valor , acao_id.ca_aco_ticker); 
    }

    return res.json(acaoCotacao);
  },

  async show(req, res) {
    const { id } = req.params;
    const acaoCotacao = await AcaoCotacao.findOne({
      include: [
        {
          model: Acao,
          as: "acao_id",
          attributes: ["id", "ca_aco_ticker", "ca_aco_nome"],
        },
      ],
      where: { id: id },
    });

    return res.json(acaoCotacao);
  },

  async update(req, res) {
    const { acao_id, ca_acc_valor } = req.body;
    const { id } = req.params;
    const ca_aco_codigo = acao_id.id;

    const acaoCotacao = await AcaoCotacao.update(
      { ca_aco_codigo, ca_acc_valor },
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
