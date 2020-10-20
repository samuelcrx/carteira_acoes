import api from "./connectionProxy";

export const getCotacoes = (userId, acoCodigo) => {
  return api.http.get(`/cotacoes/${userId}/${acoCodigo}`);
};

export const getCotacao = (id) => {
  return api.http.get(`/cotacoes/${id}`);
};

export const editCotacao = (cotacao) => {
  return api.http.put(`/cotacoes/${cotacao.id}`, cotacao);
};

export const addCotacao = (cotacao, ca_usu_codigo) => {
  console.log('API Criação ', cotacao)
  console.log('API Criação ', ca_usu_codigo)
  return api.http.post(`/cotacoes/${ca_usu_codigo}`, cotacao);
};

export const updateCotacao = (cotacao) => {
  return api.http.post(`/cotacoes/${cotacao.id}`, cotacao);
};