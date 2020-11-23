const Acao = require("../models/Acoes");
const { Op } = require('sequelize');

module.exports = {
  async index(req, res) {
    const { term, page = 1 } = req.query;

    const acoes = await Acao.findAll({
      where: {
        ca_aco_ticker: term
          ? {
              [Op.like]: `%${term}%`,
            }
          : { [Op.like]: "%" },
      },
      limit: 15,
      offset: (page - 1) * 15,
      attributes: ["id", "ca_aco_ticker", "ca_aco_nome"],
    });

    return res.json(acoes);
  },

  async store(req, res) {
    const { ca_aco_ticker, ca_aco_nome, ca_aco_ativo } = req.body;

    const acao = await Acao.create({
      ca_aco_ticker,
      ca_aco_nome,
      ca_aco_ativo,
    });

    return res.json(acao);
  },

  async show(req, res) {
    const { id } = req.params;
    const acao = await Acao.findByPk(id);

    res.json(acao);
  },

  async update(req, res) {
    const { ca_aco_ticker, ca_aco_nome, ca_aco_ativo } = req.body;
    const { id } = req.params;

    const acao = await Acao.update(
      { ca_aco_ticker, ca_aco_nome, ca_aco_ativo },
      { where: { id: id } }
    );

    return res.json(acao);
  },

  async delete(req, res) {
    const { id } = req.params;

    Acao.destroy({
      where: { id: id },
    }).then((deletedAction) => {
      res.json(deletedAction);
    });
  },
};
