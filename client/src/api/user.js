import api from "./connectionProxy";

export const getUsers = (params = {}) => {
  const { page = 0, perPage = 50, order = {}, term = "" } = params;
  return api.http.get("/users/", {
    params: {
      page,
      per_page: perPage,
      column: (order || {}).column || "",
      direction: (order || {}).direction || 1,
      term,
    },
  });
};

export const getUser = (id) => {
  return api.http.get(`/users/${id}`);
};

export const deleteUser = (id) => {
  return api.http.delete(`/users/${id}`);
};

export const editUser = (user) => {
  return api.http.put("/user", user);
};

export const restoreUser = (id) => {
  return api.http.put(`/users/${id}/restore`);
};

export const addUser = (user) => {
  return api.http.post("/users", user);
};

export const updatePassword = (user) => {
  return api.http.put(`/updatePassword/${user.id}`, user);
};
