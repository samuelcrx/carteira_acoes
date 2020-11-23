const axios = require('axios');

let ticker = 'alpk3';

async function getData(term) {
  const response = await axios.get(`https://api.hgbrasil.com/finance/stock_price?key=02100a87&symbol=${term}`);

  let arrKeys = Object.keys(response.data.results);
  console.log('Preços => ', response.data.results[arrKeys[0]]);
  let price = response.data.results[arrKeys[0]].price;

  return response
}

getData(ticker);