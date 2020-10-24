import * as API from "../../api";
import Cotacao from "../../components/Cotacao/Cotacao";
export const FETCH_COTACAO = "FETCH_COTACAO";
export const FETCHING_COTACAO = "FETCHING_COTACAO";
export const FETCH_COTACAO_ERROR = "FETCH_COTACAO_ERROR";
export const FETCH_COTACOES = "FETCH_COTACOES";
export const FETCHING_COTACOES = "FETCHING_COTACOES";
export const FETCH_COTACOES_ERROR = "FETCH_COTACOES_ERROR";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const CHANGE_COTACAO = "CHANGE_COTACAO";
export const DELETE_COTACAO = "DELETE_COTACAO";
export const ADD_COTACAO = "ADD_COTACAO";
export const EDIT_COTACAO = "EDIT_COTACAO";
export const FORM_TOUCHED = "FORM_TOUCHED";
export const NEW_FORM_COTACAO = "NEW_FORM_COTACAO";
export const CARTEIRA_FORM_ERROR = "CARTEIRA_FORM_ERROR";
export const RESET_STATE = "RESET_STATE";

export const openModal = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_MODAL });
  };
};

export const handleChangeCotacao = (cotacao) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_COTACAO, cotacao });
  };
};

// export const handleCotacaoError = (res, dispatch) => {
//   const { data: errorMessage = "" } = res;

//   switch (true) {
//     case errorMessage.includes("duplicate key error"):
//       dispatch({
//         type: FORM_TOUCHED,
//       });
//       dispatch({
//         type: CARTEIRA_FORM_ERROR,
//         field: "key",
//         message: `Carteira já cadastrada.`,
//       });
//       return Promise.reject(res);

//     default:
//       break;
//   }
// };

export const newFormCotacao = () => {
  return (dispatch) => {
    dispatch({ type: NEW_FORM_COTACAO });
  };
};

export const setCotacaoFormTouched = () => {
  return (dispatch) => {
    dispatch({ type: FORM_TOUCHED });
  };
};

export const fetchCotacoes = (userId, acoCodigo) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_COTACOES });
    return API.cotacoes
      .getCotacoes(userId, acoCodigo)
      .then((res = {}) => {
        dispatch({
          type: FETCH_COTACOES,
          cotacoes: res,
        });
      })
      .catch((err) => {
        const { response = {} } = err;
        const { data = {} } = response;
        const { message } = data;
        dispatch({
          type: FETCH_COTACOES_ERROR,
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

export const addCotacao = (cotacao, ca_usu_codigo) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_COTACOES });
    dispatch({ type: FETCHING_COTACAO });
    return API.cotacoes
      .addCotacao(cotacao, ca_usu_codigo)
      .then(({ data }) => {
        dispatch({ type: ADD_COTACAO });
      })
      .catch((err) => {
        const { response = {} } = err;
        const { data = {} } = response;
        const { message } = data;
        // handleCotacaoError(response, dispatch);
        dispatch({
          type: FETCH_COTACOES_ERROR,
          err: message || "Serviço indisponível",
        });
        return Promise.reject(err);
      });
  };
};

export const editCotacao = (cotacao) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_COTACOES });
    dispatch({ type: FETCHING_COTACAO });
    return API.cotacoes
      .editCotacao(cotacao)
      .then(({ data }) => {
        dispatch({ type: EDIT_COTACAO });
        // dispatch({ type: CLOSE_MODAL });
      })
      .catch((err) => {
        const { response = {} } = err;
        const { data = {} } = response;
        const { message } = data;
        dispatch({
          type: FETCH_COTACOES_ERROR,
          err: message || "Serviço indisponível",
        });
        // handleCotacaoError(response, dispatch);
        return Promise.reject(response);
      });
  };
};

export const fetchCotacao = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_COTACAO, clear: true });
    dispatch({ type: OPEN_MODAL });
    return API.cotacoes
      .getCotacao(id)
      .then(({ data }) => {
        dispatch({ type: FETCH_COTACAO, cotacao: data });
      })
      .catch((err) => {
        const { response = {} } = err;
        const { data = {} } = response;
        const { message } = data;
        dispatch({
          type: FETCH_COTACAO_ERROR,
          err: message || "Serviço indisponível",
        });
        return Promise.reject(err);
      });
  };
};
