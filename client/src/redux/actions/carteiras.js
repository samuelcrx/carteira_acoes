import * as API from "../../api";
export const FETCH_CARTEIRA = "FETCH_CARTEIRA";
export const FETCHING_CARTEIRA = "FETCHING_CARTEIRA";
export const FETCH_CARTEIRA_ERROR = "FETCH_CARTEIRA_ERROR";
export const FETCH_CARTEIRAS = "FETCH_CARTEIRAS";
export const FETCHING_CARTEIRAS = "FETCHING_CARTEIRAS";
export const FETCH_CARTEIRAS_ERROR = "FETCH_CARTEIRAS_ERROR";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const CHANGE_CARTEIRA = "CHANGE_CARTEIRA";
export const DELETE_CARTEIRA = "DELETE_CARTEIRA";
export const ADD_CARTEIRA = "ADD_CARTEIRA";
export const EDIT_CARTEIRA = "EDIT_CARTEIRA";
export const FORM_TOUCHED = "FORM_TOUCHED";
export const NEW_FORM_CARTEIRA = "NEW_FORM_CARTEIRA";
export const CARTEIRA_FORM_ERROR = "CARTEIRA_FORM_ERROR";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const CHANGE_PER_PAGE = "CHANGE_PER_PAGE";
export const CHANGE_ORDER_COLUMN = "CHANGE_ORDER_COLUMN";
export const CHANGE_ORDER_DIRECTION = "CHANGE_ORDER_DIRECTION";
export const RESET_STATE = "RESET_STATE";

export const openModal = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_MODAL });
  };
};

export const handleChangeCarteira = (carteira) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_CARTEIRA, carteira });
  };
};

const getDuplicateKeyField = (errorMessage) => {
  const [x, field = ""] = /collection: .* index: (.*)_/.exec(errorMessage); // eslint-disable-line
  return field;
};

export const handleCarteiraError = (res, dispatch) => {
  const { data: errorMessage = "" } = res;

  switch (true) {
    case errorMessage.includes("duplicate key error"):
      dispatch({
        type: FORM_TOUCHED,
      });
      dispatch({
        type: CARTEIRA_FORM_ERROR,
        field: "key",
        message: `Carteira já cadastrada.`,
      });
      return Promise.reject(res);

    default:
      break;
  }
};

export const newFormCarteira = () => {
  return (dispatch) => {
    dispatch({ type: NEW_FORM_CARTEIRA });
  };
};

export const setCarteiraFormTouched = () => {
  return (dispatch) => {
    dispatch({ type: FORM_TOUCHED });
  };
};

export const deleteCarteira = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_CARTEIRAS });
    return API.carteira
      .deleteCarteira(id)
      .then(({ data: carteira }) => {
      })
      .catch((err) => {
        const { response = {} } = err;
        const { data = {} } = response;
        const { message } = data;
        dispatch({
          type: FETCH_CARTEIRA_ERROR,
          err: message || "Serviço indisponível",
        });
        return Promise.reject(err);
      });
  };
};

export const handleChangePage = (page) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, page });
  };
};

export const handleChangePerPage = (perPage) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_PER_PAGE, perPage });
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

export const fetchCarteiras = (userId) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_CARTEIRAS });
    return API.carteira
      .getCarteiras(userId)
      .then((res = {}) => {
        dispatch({
          type: FETCH_CARTEIRAS,
          carteiras: res,
        });
      })
      .catch((err) => {
        const { response = {} } = err;
        const { data = {} } = response;
        const { message } = data;
        dispatch({
          type: FETCH_CARTEIRAS_ERROR,
          err: message || "Serviço indisponível",
        });
        return Promise.reject(err);
      });
  };
};

export const closeModal = () => {
  return (dispatch) => {
    dispatch({ type: CLOSE_MODAL });
  };
};

export const resetState = () => {
  return (dispatch) => {
    dispatch({ type: RESET_STATE });
  };
};

export const addCarteira = (carteira, ca_usu_codigo) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_CARTEIRAS });
    dispatch({ type: FETCHING_CARTEIRA });
    return API.carteira
      .addCarteira(carteira, ca_usu_codigo)
      .then(({ data }) => {
        dispatch({ type: ADD_CARTEIRA, carteira: data });
      })
      .catch((err) => {
        const { response = {} } = err;
        const { data = {} } = response;
        const { message } = data;
        handleCarteiraError(response, dispatch);
        dispatch({
          type: FETCH_CARTEIRAS_ERROR,
          err: message || "Serviço indisponível",
        });
        return Promise.reject(err);
      });
  };
};

export const editCarteira = (carteira) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_CARTEIRAS });
    dispatch({ type: FETCHING_CARTEIRA });
    return API.carteira
      .editCarteira(carteira)
      .then(({ data }) => {
        dispatch({ type: EDIT_CARTEIRA, carteira: data });
      })
      .catch((err) => {
        const { response = {} } = err;
        const { data = {} } = response;
        const { message } = data;
        dispatch({
          type: FETCH_CARTEIRAS_ERROR,
          err: message || "Serviço indisponível",
        });
        handleCarteiraError(response, dispatch);
        return Promise.reject(response);
      });
  };
};

export const fetchCarteira = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_CARTEIRA, clear: true });
    dispatch({ type: OPEN_MODAL });
    return API.carteira
      .getCarteira(id)
      .then(({ data }) => {
        console.log('dataa ', data)
        dispatch({ type: FETCH_CARTEIRA, carteira: data });
      })
      .catch((err) => {
        console.log(err)
        const { response = {} } = err;
        const { data = {} } = response;
        const { message } = data;
        dispatch({
          type: FETCH_CARTEIRA_ERROR,
          err: message || "Serviço indisponível",
        });
        return Promise.reject(err);
      });
  };
};
