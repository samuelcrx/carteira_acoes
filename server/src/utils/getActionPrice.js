const axios = require('axios');

const price = {
  async gerarPreco(term) {
    return new Promise(async (resolve, reject) => {
      const response = await axios.get(`https://api.hgbrasil.com/finance/stock_price?key=02100a87&symbol=${term}`);
      let arrKeys = Object.keys(response.data.results);
      let price = response.data.results[arrKeys[0]].price;

      if (price) {
        resolve(price);
      } else {
        resolve(0);
      }
    })
  }
}

module.exports = price