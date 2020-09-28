const { json } = require("sequelize");
const Carteiras = require("../models/Carteiras");
const CarteiraItens = require("../models/CarteiraItens");
const AcoesCotacoes = require("../models/AcoesCotacoes");
const Acao = require("../models/Acoes");

module.exports = {
  async index(req, res) {
    const { userId } = req.params;

    const data = await Carteiras.findAll({ where: { ca_usu_codigo: userId } });

    for (let carteira of data) {
      const itens = await CarteiraItens.findAll({
        attributes: [
          "ca_crt_codigo",
          "ca_aco_codigo",
          "ca_cri_quantidade",
          "ca_cri_valor_medio",
        ],
        where: { ca_crt_codigo: carteira.dataValues.id },
      });

      if (itens.length) {
        for (let item of itens) {
          const cotacoes = await AcoesCotacoes.findOne({
            attributes: ["ca_acc_valor", "ca_aco_codigo", "createdAt"],
            where: { ca_aco_codigo: item.dataValues.ca_aco_codigo },
            order: [["createdAt", "DESC"]],
          });

          item.dataValues.ca_cotacao = cotacoes.dataValues.ca_acc_valor;

          if (item.dataValues.ca_cri_quantidade) {
            carteira.dataValues.valor_atual =
              item.dataValues.ca_cri_quantidade * item.dataValues.ca_cotacao;
            carteira.dataValues.valor_investido =
              item.dataValues.ca_cri_quantidade *
              item.dataValues.ca_cri_valor_medio;
          } else {
            carteira.dataValues.valor_atual = 0;
            carteira.dataValues.valor_investido = 0;
          }

          console.log(carteira.dataValues);
        }
      } else {
        carteira.dataValues.valor_atual = 0;
        carteira.dataValues.valor_investido = 0;
      }
    }
    return res.json(data);
  },

  async store(req, res) {
    const { ca_crt_descricao, ca_crt_ativo } = req.body;
    const { ca_usu_codigo } = req.params;

    const carteira = await Carteiras.create({
      ca_usu_codigo,
      ca_crt_descricao,
      ca_crt_ativo,
    });

    return res.json(carteira);
  },

  async show(req, res) {
    const { id } = req.params;
    const carteira = await Carteiras.findByPk(id);

    res.json(carteira);
  },

  async update(req, res) {
    const { ca_crt_descricao, ca_crt_ativo } = req.body;
    const { id } = req.params;

    const carteira = await Carteiras.update(
      { ca_crt_descricao, ca_crt_ativo },
      { where: { id: id } }
    );

    return res.json(carteira);
  },

  async delete(req, res) {
    const { id } = req.params;

    Carteiras.destroy({
      where: { id },
    }).then((deletedData) => {
      console.log(`Carteira deletada ${deletedData}`);
      res.json(deletedData);
    });
  },
};
