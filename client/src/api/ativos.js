import api from "./connectionProxy";

export const getItens = (carteiraId) => {
  return api.http.get(`/itens/${carteiraId}`);
};

export const getItem = (id) => {
  return api.http.get(`/itens/${id}`);
};

export const deleteItem = (id) => {
  return api.http.delete(`/itens/${id}`);
};

export const editItem = (item) => {
  return api.http.put(`/itens/${item.id}`, item);
};

export const addItem = (item) => {
  return api.http.post("/itens", item);
};
