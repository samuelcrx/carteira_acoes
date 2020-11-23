import * as API from "../../api";
export const FETCH_USER = "FETCH_USER";
export const FETCHING_USER = "FETCHING_USER";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";
export const FETCH_USERS = "FETCH_USERS";
export const FETCHING_USERS = "FETCHING_USERS";
export const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";
export const OPEN_MODAL_SENHA = "OPEN_MODAL_SENHA";
export const CLOSE_MODAL_SENHA = "CLOSE_MODAL_SENHA";
export const OPEN_MODAL_PASS = "OPEN_MODAL_PASS";
export const CLOSE_MODAL_PASS = "CLOSE_MODAL_PASS";
export const CHANGE_USER = "CHANGE_USER";
export const CHANGE_PASS = "CHANGE_PASS";
export const DELETE_USER = "DELETE_USER";
export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";
export const FORM_TOUCHED = "FORM_TOUCHED";
export const NEW_FORM_USER = "NEW_FORM_USER";
export const USER_FORM_ERROR = "USER_FORM_ERROR";
export const FETCH_PROFILES = "FETCH_PROFILES";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const CHANGE_PER_PAGE = "CHANGE_PER_PAGE";
export const CHANGE_ORDER_COLUMN = "CHANGE_ORDER_COLUMN";
export const CHANGE_ORDER_DIRECTION = "CHANGE_ORDER_DIRECTION";
export const CHANGE_UPDATE_PASSWORD_FORM = "CHANGE_UPDATE_PASSWORD_FORM";
export const RESET_STATE = "RESET_STATE";

export const openModal = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_MODAL_SENHA });
  };
};

export const openModalPass = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_MODAL_PASS });
  };
};

export const handleChangeUser = (user) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_USER, user });
  };
};

const getDuplicateKeyField = (errorMessage) => {
  const [x, field = ""] = /collection: .* index: (.*)_/.exec(errorMessage); // eslint-disable-line
  return field;
};

export const handleUserError = (res, dispatch) => {
  const { data: errorMessage = "" } = res;

  switch (true) {
    case errorMessage.includes("duplicate key error"):
      dispatch({
        type: FORM_TOUCHED,
      });
      dispatch({
        type: USER_FORM_ERROR,
        field: getDuplicateKeyField(errorMessage),
        message: `${getDuplicateKeyField(errorMessage)} já cadastrado.`,
      });
      return Promise.reject(res);

    default:
      break;
  }
};

export const newFormUser = (user) => {
  return (dispatch) => {
    dispatch({ type: NEW_FORM_USER });
  };
};

export const setUserFormTouched = (user) => {
  return (dispatch) => {
    dispatch({ type: FORM_TOUCHED });
  };
};

export const resetState = () => {
  return (dispatch) => {
    dispatch({ type: RESET_STATE });
  };
};

export const closeModal = () => {
  return (dispatch) => {
    dispatch({ type: CLOSE_MODAL_SENHA });
  };
};

export const closeModalPass = () => {
  return (dispatch) => {
    dispatch({ type: CLOSE_MODAL_PASS });
  };
};

export const changeOrderColumn = (column) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_ORDER_COLUMN, column });
  };
};

export const changeOrderDirection = (direction) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_ORDER_DIRECTION, direction });
  };
};

export const changeUpdatePasswordForm = (updatePasswordForm) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_UPDATE_PASSWORD_FORM, updatePasswordForm });
  };
};

export const updatePassword = (user) => {
  return (dispatch) => {
    return API.user.updatePassword(user).then((res = []) => {
      dispatch({ type: CLOSE_MODAL_PASS });
    });
  };
};

export const handleChangeUserPass = (pass) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_PASS, pass });
  }
}

export const fetchUsers = (options) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_USERS });
    return API.user
      .getUsers(options)
      .then((res = {}) => {
        const { data } = res;
        dispatch({
          type: FETCH_USERS,
          users: data.items,
          length: data.length,
          page: data.page,
          order: data.order,
          rowsPerPage: data.rowsPerPage,
        });
      })
      .catch((err) => {
        const { response = {} } = err;
        const { data = {} } = response;
        const { message } = data;
        dispatch({
          type: FETCH_USERS_ERROR,
          err: message || "Serviço indisponível",
        });
        return Promise.reject(err);
      });
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_USERS });
    return API.user
      .deleteUser(id)
      .then((response) => {
        const { data } = response;
        dispatch({ type: DELETE_USER, user: data });
      })
      .catch((err) => {
        const { response = {} } = err;
        const { data = {} } = response;
        const { message } = data;
        dispatch({
          type: FETCH_USERS_ERROR,
          err: message || "Serviço indisponível",
        });
        return Promise.reject(err);
      });
  };
};

export const addUser = (user) => {
  return (dispatch) => {
    return API.user
      .addUser(user)
      .then((response) => {
        const { data } = response;
        if (data) {
          dispatch({ type: ADD_USER, user: data });
        }
      })
      .catch((err) => {
        const { response = {} } = err;
        const { data = {} } = response;
        const { message } = data;
        handleUserError(response, dispatch);
        dispatch({
          type: FETCH_USERS_ERROR,
          err: message || "Serviço indisponível",
        });
        return Promise.reject(err);
      });
  };
};

export const editUser = (user) => {
  return (dispatch) => {
    return API.user
      .editUser(user)
      .then(({ data }) => {
      })
      .catch((err) => {
        const { response = {} } = err;
        const { data = {} } = response;
        const { message } = data;
        dispatch({
          type: FETCH_USERS_ERROR,
          err: message || "Serviço indisponível",
        });
        handleUserError(response, dispatch);
        return Promise.reject(response);
      });
  };
};

export const fetchUser = (id) => {
  return (dispatch) => {
    return API.user
      .getUser(id)
      .then(({ data }) => {
        dispatch({ type: FETCH_USER, user: data });
      })
      .catch((err) => {
        const { response = {} } = err;
        const { data = {} } = response;
        const { message } = data;
        dispatch({
          type: FETCH_USER_ERROR,
          err: message || "Serviço indisponível",
        });
        return Promise.reject(err);
      });
  };
};
