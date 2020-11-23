import axios from 'axios'

const apiAcoes = axios.create({  
  // baseURL: 'https://api.hgbrasil.com/finance/stock_price?key=02100a87&symbol=' 
  baseURL: 'https://viacep.com.br/ws/'
  // baseURL: 'https://api.github.com/users/'
});

export default apiAcoes

