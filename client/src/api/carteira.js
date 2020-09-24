import api from "./connectionProxy";

export const getCarteiras = (params = {}) => {
  return api.http.get("/carteiras");
};

export const getCarteira = (id) => {
  return api.http.get(`/carteiras/${id}`);
};

export const deleteCarteira = (id) => {
  return api.http.delete(`/carteiras/${id}`);
};

export const editCarteira = (carteira) => {
  return api.http.put(`/carteiras/${carteira.id}`, carteira);
};

export const addCarteira = (carteira) => {
  return api.http.post(`/carteiras/${carteira.ca_usu_codigo}`, carteira);
};

export const updateCarteira = (carteira) => {
  return api.http.post(`/carteiras/${carteira.id}`, carteira);
};
