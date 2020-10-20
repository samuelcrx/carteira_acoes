import api from "./connectionProxy";
import { formatContentSelectValue } from '../utils'

export const getLancamentos = (carteiraId, acaoCodigo) => {
  return api.http.get(`/movimentacao/${carteiraId}/${acaoCodigo}`);
};

export const getLancamento = (id) => {
  return api.http.get(`/movimentacao/${id}`);
};

export const deleteLancamento = (id) => {
  return api.http.delete(`/movimentacao/${id}`);
};

export const editLancamento = (lancamento) => {
  return api.http.put(`/movimentacao/${lancamento.id}`, lancamento);
};

export const addLancamento = (lancamento) => {
  return api.http.post("/movimentacao", lancamento);
};

export const searchAcoes = term => {
  return api.http.get(`/acoes/${term}`)
}

export const getSelectAcoes = (term, callback) => {
  searchAcoes(term).then(response => {
    const { data } = response
    
    const options = formatContentSelectValue(data)
    callback(null, {
      options,
      complete: true
    })
  })
}