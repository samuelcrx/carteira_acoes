import axios from 'axios'

console.log("entrou A");

const apiAcoes = axios.create({  
  // baseURL: 'https://api.hgbrasil.com/finance/stock_price?key=02100a87&symbol='
  baseURL: 'https://viacep.com.br/ws/'
});

console.log("entrou B");

export default apiAcoes

