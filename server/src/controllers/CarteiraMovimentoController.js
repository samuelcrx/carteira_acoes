const CarteiraMovimento = require("../models/CarteiraMovimento");
const Carteira = require("../models/Carteiras");
const CarteiraItens = require("../models/CarteiraItens");
const Acao = require("../models/Acoes");
const { Op } = require("sequelize");
const { findOne } = require("../models/CarteiraMovimento");

module.exports = {
  async index(req, res) {
    const { carteiraId, acaoCodigo } = req.params;
    const { term } = req.query;
    const carteiraMovimentos = await CarteiraMovimento.findAll({
      include: [
        {
          model: Carteira,
          as: "carteira_id",
          attributes: ["id", "ca_crt_descricao"],
        },
        {
          model: Acao,
          as: "acao_id",
          attributes: ["id", "ca_aco_ticker"],
        },
      ],
      attributes: [
        "id",
        "createdAt",
        "ca_aco_codigo",
        "ca_crm_compra_venda",
        "ca_crm_valor",
        "ca_crm_quantidade",
        "updatedAt",
      ],
      where: {
        ca_crt_codigo: carteiraId,
        ca_aco_codigo: acaoCodigo,
        ca_crm_compra_venda: term
          ? {
              [Op.like]: `%${term}%`,
            }
          : { [Op.like]: "%" },
      },
      order: [
        ["id", "ASC"],
        ["createdAt", "ASC"],
      ],
    });

    return res.json(carteiraMovimentos);
  },

  async store(req, res) {
    const {
      ca_crt_codigo,
      ca_crm_compra_venda,
      ca_crm_quantidade,
      ca_crm_valor,
      acao_id,
    } = req.body;

    const ca_aco_codigo = acao_id.id;

    const carteiraMovimentada = await CarteiraMovimento.create({
      ca_crt_codigo,
      ca_aco_codigo,
      ca_crm_compra_venda,
      ca_crm_quantidade,
      ca_crm_valor,
    });

    const percorreMovimentacao = await CarteiraMovimento.findAll({
      where: { ca_crt_codigo: ca_crt_codigo, ca_aco_codigo: ca_aco_codigo },
      order: [
        ["id", "ASC"],
        ["createdAt", "ASC"],
      ],
    });

    let valor_medio = 0;
    let qtdEmCarteira = 0;
    for (let movimento of percorreMovimentacao) {
      if (movimento.dataValues.ca_crm_compra_venda == "C") {
        valor_medio =
          (valor_medio * qtdEmCarteira +
            movimento.ca_crm_quantidade * movimento.ca_crm_valor) /
          (qtdEmCarteira + movimento.ca_crm_quantidade);
        qtdEmCarteira = qtdEmCarteira + movimento.ca_crm_quantidade;
      } else {
        qtdEmCarteira = qtdEmCarteira - movimento.ca_crm_quantidade;
      }
    }

    const ativo = await CarteiraItens.findOne({
      where: { ca_crt_codigo: ca_crt_codigo, ca_aco_codigo: ca_aco_codigo },
    });

    if (ativo) {
      const ca_cri_quantidade = qtdEmCarteira;
      const ca_cri_valor_medio = valor_medio;

      const updateAtivo = await CarteiraItens.update(
        { ca_aco_codigo, ca_cri_quantidade, ca_cri_valor_medio },
        { where: { id: ativo.dataValues.id } }
      );
    } else {
      const ca_cri_quantidade = qtdEmCarteira;
      const ca_cri_valor_medio = valor_medio;

      const ativo = await CarteiraItens.create({
        ca_crt_codigo,
        ca_aco_codigo,
        ca_cri_quantidade,
        ca_cri_valor_medio,
      });
    }

    return res.json(carteiraMovimentada);
  },

  async show(req, res) {
    const { id } = req.params;
    const carteiraMovimentacao = await CarteiraMovimento.findOne({
      include: [
        {
          model: Acao,
          as: "acao_id",
          attributes: ["id", "ca_aco_ticker"],
        },
      ],
      attributes: [
        "id",
        "ca_crm_compra_venda",
        "ca_crt_codigo",
        "ca_crm_valor",
        "ca_crm_quantidade",
      ],
      where: { id: id },
    });

    if (carteiraMovimentacao) {
      res.json(carteiraMovimentacao);
    }

    res.json({});
  },

  async update(req, res) {
    const {
      ca_crm_compra_venda,
      ca_crt_codigo,
      ca_crm_quantidade,
      ca_crm_valor,
      acao_id,
    } = req.body;
    const { id } = req.params;

    const updateMovimento = await CarteiraMovimento.update(
      { ca_crm_compra_venda, ca_crm_quantidade, ca_crm_valor },
      { where: { id: id } }
    );

    const percorreMovimentacao = await CarteiraMovimento.findAll({
      where: { ca_crt_codigo, ca_aco_codigo: acao_id.id },
      order: [["createdAt", "ASC"]],
    });

    let valor_medio = 0;
    let qtdEmCarteira = 0;
    for (let movimento of percorreMovimentacao) {
      if (movimento.dataValues.ca_crm_compra_venda == "C") {
        valor_medio =
          (valor_medio * qtdEmCarteira +
            movimento.ca_crm_quantidade * movimento.ca_crm_valor) /
          (qtdEmCarteira + movimento.ca_crm_quantidade);
        qtdEmCarteira = qtdEmCarteira + movimento.ca_crm_quantidade;
      } else {
        qtdEmCarteira = qtdEmCarteira - movimento.ca_crm_quantidade;
      }
    }

    const ativo = await CarteiraItens.findOne({
      where: { ca_crt_codigo, ca_aco_codigo: acao_id.id },
    });

    if (ativo) {
      const ca_cri_quantidade = qtdEmCarteira;
      const ca_cri_valor_medio = valor_medio;

      const updateAtivo = await CarteiraItens.update(
        { ca_aco_codigo: acao_id.id, ca_cri_quantidade, ca_cri_valor_medio },
        { where: { id: ativo.dataValues.id } }
      );
    } else {
      const ca_cri_quantidade = qtdEmCarteira;
      const ca_cri_valor_medio = valor_medio;
      const ativo = await CarteiraItens.create({
        ca_crt_codigo,
        ca_aco_codigo: acao_id.id,
        ca_cri_quantidade,
        ca_cri_valor_medio,
      });
    }

    return res.json(updateMovimento);
  },

  async delete(req, res) {
    const { id } = req.params;

    const carteira = await CarteiraMovimento.findOne({ where: { id: id } });

    const deletedItem = await CarteiraMovimento.destroy({
      where: { id },
    });

    const percorreMovimentacao = await CarteiraMovimento.findAll({
      where: {
        ca_crt_codigo: carteira.dataValues.ca_crt_codigo,
        ca_aco_codigo: carteira.dataValues.ca_aco_codigo,
      },
      order: [
        ["id", "ASC"],
        ["createdAt", "ASC"],
      ],
    });

    let valor_medio = 0;
    let qtdEmCarteira = 0;
    for (let movimento of percorreMovimentacao) {
      if (movimento.dataValues.ca_crm_compra_venda == "C") {
        valor_medio =
          (valor_medio * qtdEmCarteira +
            movimento.ca_crm_quantidade * movimento.ca_crm_valor) /
          (qtdEmCarteira + movimento.ca_crm_quantidade);
        qtdEmCarteira = qtdEmCarteira + movimento.ca_crm_quantidade;
      } else {
        qtdEmCarteira = qtdEmCarteira - movimento.ca_crm_quantidade;
      }
    }

    const ativo = await CarteiraItens.findOne({
      where: {
        ca_crt_codigo: carteira.dataValues.ca_crt_codigo,
        ca_aco_codigo: carteira.dataValues.ca_aco_codigo,
      },
    });

    if (ativo) {
      const ca_cri_quantidade = qtdEmCarteira;
      const ca_cri_valor_medio = valor_medio;
      const ca_aco_codigo = carteira.dataValues.ca_aco_codigo;

      const updateAtivo = await CarteiraItens.update(
        { ca_aco_codigo, ca_cri_quantidade, ca_cri_valor_medio },
        { where: { id: ativo.dataValues.id } }
      );
    } else {
      const ca_cri_quantidade = qtdEmCarteira;
      const ca_cri_valor_medio = valor_medio;

      const ativo = await CarteiraItens.create({
        ca_crt_codigo,
        ca_aco_codigo,
        ca_cri_quantidade,
        ca_cri_valor_medio,
      });
    }

    res.json(deletedItem);
  },
};
