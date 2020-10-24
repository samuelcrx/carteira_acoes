import api from "./connectionProxy";

export const getCarteiras = (userId) => {
  return api.http.get(`/carteiras/${userId}`);
};

export const getCarteira = (id) => {
  return api.http.get(`/carteira/${id}`);
};

export const deleteCarteira = (id) => {
  return api.http.delete(`/carteiras/${id}`);
};

export const editCarteira = (carteira) => {
  return api.http.put(`/carteiras/${carteira.id}`, carteira);
};

export const addCarteira = (carteira, ca_usu_codigo) => {
  return api.http.post(`/carteiras/${ca_usu_codigo}`, carteira);
};

export const updateCarteira = (carteira) => {
  return api.http.post(`/carteiras/${carteira.id}`, carteira);
};
