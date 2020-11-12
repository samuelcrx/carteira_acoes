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
            console.log("Erro na geração");
            reject(err)
          } else {
            console.log("Foi ", res);
            resolve(res)
          }
        },
      );
    })
  }
}

module.exports = report