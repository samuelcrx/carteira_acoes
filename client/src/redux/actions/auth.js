import * as API from "../../api";
export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOADING_LOGIN = "LOADING_LOGIN";
export const CHANGE_NEXT_PATH = "CHANGE_NEXT_PATH";
export const CLEAR_NEXT_PATH = "CLEAR_NEXT_PATH";
export const CLEAR_REFRESH_TOKEN = "CLEAR_REFRESH_TOKEN";
export const AUTH_LOADING = "AUTH_LOADING";
export const RECORD_USER = "RECORD_USER";
export const OPEN_PROFILE_MODAL = "OPEN_PROFILE_MODAL";
export const CLOSE_PROFILE_MODAL = "CLOSE_PROFILE_MODAL";

export const login = ({ ca_usu_login, ca_usu_cripto }) => {
  return (dispatch) => {
    dispatch({ type: LOADING_LOGIN });
    return API.auth
      .login({ ca_usu_login, ca_usu_cripto })
      .then(({ data, headers }) => {
        const { token, user } = data;
        dispatch({
          type: AUTH_LOGIN,
          token: `Bearer ${token}`,
        });
        dispatch({
          type: RECORD_USER,
          user: user,
        });
        return data;
      })
      .catch((error) => {
        const { response = {} } = error;
        const { status } = response;
        dispatch({
          type: AUTH_ERROR,
          err:
            status === 401
              ? "Email e/ou senha inválidos."
              : "Serviço indisponível",
        });
        return Promise.reject(error);
      });
  };
};

export const resetPasswordByEmail = (email) => {
  return (dispatch) => {
    return API.auth.resetPasswordByEmail(email).catch((error) => {
      dispatch({
        type: AUTH_ERROR,
        err: "Falha na redefinição de senha.",
      });
      return Promise.reject(error);
    });
  };
};

export const openModalProfile = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_PROFILE_MODAL });
  };
};
export const closeModalProfile = () => {
  return (dispatch) => {
    dispatch({ type: CLOSE_PROFILE_MODAL });
  };
};

export const authLoading = (loading) => {
  return (dispatch) => {
    dispatch({ type: AUTH_LOADING, loading: !!loading });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: LOADING_LOGIN });
    return API.auth
      .logout()
      .then(({ data }) => {
        dispatch({ type: AUTH_LOGOUT });
      })
      .catch((err) => {
        dispatch({ type: AUTH_ERROR });
      });
  };
};

export const changeNextPath = (path = "/") => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_NEXT_PATH,
      path: path.replace(/\/:[a-zA-Z]*.*/, ""),
    });
  };
};

export const clearNextPath = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_NEXT_PATH });
  };
};
