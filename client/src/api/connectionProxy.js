import axios from "axios";
import { AUTH_LOGIN, AUTH_LOGOUT } from "../redux/actions/auth";
import * as auth from "./auth";
const { REACT_APP_API_BASE_URL } = process.env;

class ConnectionProxy {
  constructor() {
    this.http = axios.create({
      baseURL: REACT_APP_API_BASE_URL,
      timeout: 10000,
    });
    this.isAlreadyFetchingAccessToken = false;
    this.refreshSubscribers = [];
    this.isRefreshing = false;
    this.auth = {
      token: ""
    };
    this.configure();
  }

  /**
   * Faz configurações iniciais do interceptador
   */
  configure = () => {
    this.http.interceptors.request.use(
      (config) => {
        config.headers.common["Cache-Control"] = "no-cache";
        config.headers.get = {};
        config.headers.get["If-Modified-Since"] = "0";
        config.cache = false;
        config.validateStatus = (status) => status >= 200 && status <= 300;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };

  /**
   * Deve ser executada logo após iniciar a store
   * @param {object} store - Estado global da aplicação
   */
  getStore = (store) => {
    this.store = store;
    this.store.subscribe(this.updateInterceptor);
  };

  /**
   * Adiciona requisição para nova tentativa
   * @param {function} retryRequest - Contém a tentativa de uma nova requisição
   */
  subscribeTokenRefresh = (retryRequest) => {
    this.refreshSubscribers = [...this.refreshSubscribers, retryRequest];
  };

  /**
   * Executa requisições que estavam esperando a renovação do token
   * @param {string} token - Token atualizado para nova tentativa de requisição
   */
  onRefreshed = (token) => {
    this.refreshSubscribers.map((retryRequest) => {
      return retryRequest(token);
    });
    this.refreshSubscribers = [];
  };

  /**
   * @param {object} originalRequest - Representa configurações da requisição a ser guardada
   * @return {promise} - Retorna promise que contém a tentativa de nova requisição
   */
  retryOriginalRequest = (originalRequest) => {
    return new Promise((resolve, reject) => {
      this.subscribeTokenRefresh((token) => {
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        resolve(this.http(originalRequest));
      });
    });
  };

  /**
   * Executa quando há um erro na atualização do token
   */
  handleRefreshTokenError = (error) => {
    this.isRefreshing = false;
    this.refreshingOriginalRequest = null;
    const { response = {} } = error;
    if (response.status === 401) {
      this.store.dispatch((dispatch) => {
        dispatch({
          type: AUTH_LOGOUT,
        });
      });
    }
    return Promise.reject(error);
  };

  /**
   * Faz a autenticação do usuário
   * @param {string} token - Token recebido no login
   * @param {string} refreshToken - Token para renovação do token recebido no login
   */
  loginWithRefreshedToken = (token, refreshToken) => {
    this.store.dispatch((dispatch) => {
      dispatch({
        type: AUTH_LOGIN,
        token: `Bearer ${token}`,
        refreshToken,
      });
    });
  };

  /**
   * Remove autenticação inválida da aplicação
   */
  logout = () => {
    this.store.dispatch((dispatch) => {
      dispatch({
        type: AUTH_LOGOUT,
      });
    });
  };

  /**
   * Executa quando o token é atualizado
   */
  handleRefreshToken = (response) => {
    this.isRefreshing = false;
    const refreshToken = response.headers["x-refresh-token"];
    const { data = {} } = response;
    const { token } = data;
    const originalRequest = this.refreshingOriginalRequest;

    this.refreshingOriginalRequest = null;

    this.loginWithRefreshedToken(token, refreshToken);
    this.onRefreshed(`Bearer ${token}`);

    originalRequest.headers["Authorization"] = `Bearer ${token}`;
    return this.http(originalRequest);
  };

  // /**
  //  * Faz a renovação do token
  //  * @param {string} refreshToken
  //  */
  // refreshToken = (refreshToken) => {
  //   this.isRefreshing = true;
  //   return auth
  //     .refreshToken(refreshToken)
  //     .then(this.handleRefreshToken)
  //     .catch(this.handleRefreshTokenError);
  // };

  /**
   * Executa quando há um erro na autenticação
   */
  // handleAuthenticationError = (error, originalRequest, refreshToken) => {
  //   const { response = {} } = error;
  //   // Retorna erro caso haja status http 401 ao tentar atualizar o token
  //   // if (originalRequest.url.includes("auth/refresh_token")) {
  //   //   return Promise.reject(error);
  //   // }

  //   if (response.status === 401) {
  //     return Promise.reject(error);
  //   }

  //   // Guarda requisição que está aguardando atualização do token
  //   // if (this.isRefreshing) {
  //   //   return this.retryOriginalRequest(originalRequest);
  //   // }

  //   // Atualiza token caso haja um refreshToken
  //   if (refreshToken) {
  //     this.refreshingOriginalRequest = originalRequest;
  //     return this.refreshToken(refreshToken);
  //   } else {
  //     this.logout();
  //     return Promise.reject(error);
  //   }
  // };

  /**
   * Atualiza interceptador
   */
  updateInterceptor = () => {
    const {
      auth: { token },
    } = this.store.getState();

    if (this.auth.token === token)
      return false;

    this.auth = {
      token,
    };

    // Atualiza interceptador
    this.http.defaults.headers.common["Authorization"] = token || null;
    this.http.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        const {
          auth: { refreshToken },
        } = this.store.getState();
        const { config, response = {} } = error;
        const originalRequest = config;

        if (response.status === 403 || response.status === 401) {
          return this.handleAuthenticationError(
            error,
            originalRequest
          );
        }
        return Promise.reject(error);
      }
    );
  };
}

// Representa uma instancia unica da classe ConnectionProxy
const api = new ConnectionProxy();

export default api;
