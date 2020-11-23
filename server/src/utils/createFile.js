const pdf = require("html-pdf");
const { resolve } = require("path");

const resol = resolve;

const report = {
  async gerarRelatorio(conteudo, options) {
    return new Promise((resolve, reject) => {

      pdf
      .create(conteudo, options)
      .toFile(
        resol(__dirname, "..", "relatorios", "ativos.pdf"),
        (err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        },
      );
    })
  }
}

module.exports = report