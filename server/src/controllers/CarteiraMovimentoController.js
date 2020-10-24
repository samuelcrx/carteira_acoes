const CarteiraMovimento = require("../models/CarteiraMovimento");
const Carteira = require("../models/Carteiras");
const CarteiraItens = require("../models/CarteiraItens");
const Acao = require("../models/Acoes");

module.exports = {
  async index(req, res) {
    const { carteiraId, acaoCodigo } = req.params;
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
      where: { ca_crt_codigo: carteiraId, ca_aco_codigo: acaoCodigo },
    });

    return res.json(carteiraMovimentos);
  },

  async store(req, res) {
    const {
      ca_crt_codigo,
      ca_crm_compra_venda,
      ca_crm_quantidade,
      ca_crm_valor,
      acao_id
    } = req.body;

    console.log('Ativo ', req.body)

    const ca_aco_codigo = acao_id.id;

    let valor_medio = 0;
    let qtdEmCarteira = 0;

    const carteiraMovimentada = await CarteiraMovimento.create({
      ca_crt_codigo,
      ca_aco_codigo,
      ca_crm_compra_venda,
      ca_crm_quantidade,
      ca_crm_valor,
    });

    const percorreMovimentacao = await CarteiraMovimento.findAll({
      where: { ca_crt_codigo: ca_crt_codigo, ca_aco_codigo: ca_aco_codigo },
      order: [["createdAt", "ASC"]],
    });

    for (let movimento of percorreMovimentacao) {
      if (movimento.dataValues.ca_crm_compra_venda == "C") {
        valor_medio =
          (valor_medio * qtdEmCarteira + ca_crm_quantidade * ca_crm_valor) /
          (qtdEmCarteira + ca_crm_quantidade);

        qtdEmCarteira = qtdEmCarteira + ca_crm_quantidade;
      } else {
        qtdEmCarteira = qtdEmCarteira - ca_crm_quantidade;
      }
    }

    const ativo = await CarteiraItens.findOne({
      where: { ca_crt_codigo: ca_crt_codigo, ca_aco_codigo: ca_aco_codigo },
    });

    if (ativo) {
      const ca_cri_quantidade = qtdEmCarteira;
      const ca_cri_valor_medio = valor_medio;

      console.log('Ativo ', ativo)

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

      console.log('Ativo ', ativo)
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
      ca_aco_codigo,
      ca_crt_codigo,
      ca_crm_compra_venda,
      ca_crm_data,
      ca_crm_valor,
    } = req.body;
    const { id } = req.params;

    let valor_medio = 0;
    let qtdEmCarteira = 0;

    const updateMovimento = await CarteiraMovimento.update(
      { ca_aco_codigo, ca_crm_compra_venda, ca_crm_data, ca_crm_valor },
      { where: { id: id } }
    );

    const percorreMovimentacao = await CarteiraMovimento.findAll({
      where: { ca_crt_codigo: ca_crt_codigo, ca_aco_codigo: ca_aco_codigo },
      order: [["createdAt", "ASC"]],
    });

    for (let movimento of percorreMovimentacao) {
      console.log(movimento.dataValues);
      if (movimento.dataValues.ca_crm_compra_venda == "C") {
        valor_medio =
          (valor_medio * qtdEmCarteira + ca_crm_quantidade * ca_crm_valor) /
          (qtdEmCarteira + ca_crm_quantidade);

        qtdEmCarteira = qtdEmCarteira + ca_crm_quantidade;
      } else {
        qtdEmCarteira = qtdEmCarteira - ca_crm_quantidade;
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

    return res.json(updateMovimento);
  },

  async delete(req, res) {
    const { id } = req.params;

    CarteiraMovimento.destroy({
      where: { id },
    }).then((deletedMove) => {
      console.log(`Ação Cotação deletada ${deletedMove}`);
      res.json(deletedMove);
    });
  },
};
