import api from "./connectionProxy";

export const getItens = (carteiraId, term) => {
  return api.http.get(`/itens/${carteiraId}`, {
    params: {
      term
    }
  });
};

export const getItem = (id) => {
  return api.http.get(`/itens/${id}`);
};

export const getItemLembrete = (id) => {
  return api.http.get(`/itens/lembretes/${id}`);
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

export const addLembrete = (item) => {
  console.log('Id ', item)
  return api.http.put(`/itens/create/${item.id}`, item);
};
export const updateLembrete = (item) => {
  return api.http.put(`/itens/update/${item.id}`, item);
};
