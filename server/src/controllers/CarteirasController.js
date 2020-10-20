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
      carteira.dataValues.valor_atual = 0;
      carteira.dataValues.valor_investido = 0;
      // console.log(carteira)
      const itens = await CarteiraItens.findAll({
        attributes: [
          "ca_crt_codigo",
          "ca_aco_codigo",
          "ca_cri_quantidade",
          "ca_cri_valor_medio",
        ],
        where: { ca_crt_codigo: carteira.dataValues.id },
      });
      // console.log(itens);
      if (itens) {
        console.log("aqui mesmo");
        for (let item of itens) {
          const cotacoes = await AcoesCotacoes.findOne({
            attributes: ["ca_acc_valor", "ca_aco_codigo", "createdAt"],
            where: { ca_aco_codigo: item.dataValues.ca_aco_codigo },
            order: [["createdAt", "DESC"]],
          });

          if (cotacoes) {
            console.log("cotou ");
            if (item != null) {
              console.log("item nao é nulo");
              if (cotacoes.dataValues.ca_acc_valor) {
                item.dataValues.ca_cotacao = cotacoes.dataValues.ca_acc_valor;
              } else {
                item.dataValues.ca_cotacao = 0;
              }
            }
          } else {
            item.dataValues.ca_cotacao = 0;
          }

          if (item.dataValues.ca_cri_quantidade) {
            // console.log('aqui foi cotaddd ', item.dataValues)
            carteira.dataValues.valor_atual +=
              item.dataValues.ca_cri_quantidade * item.dataValues.ca_cotacao;
            console.log("PRINTAAA", carteira.dataValues);

            carteira.dataValues.valor_investido +=
              item.dataValues.ca_cri_quantidade *
              item.dataValues.ca_cri_valor_medio;
          }
        }
      }
    }
    // console.log(data)
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
