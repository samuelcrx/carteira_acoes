import { combineReducers } from "redux";
import { CookieStorage } from "redux-persist-cookie-storage";
import { persistReducer } from "redux-persist";
import Cookies from "cookies-js";

import auth from "./auth";
import carteira from "./carteira";
import cotacao from "./cotacoes";
import itens from "./itens";
import lancamentos from "./lancamentos";
import message from "./message";
import user from "./user";

const persistConfig = {
  key: "CARTEIRAS_ACOES",
  storage: new CookieStorage(Cookies, {
    expiration: {
      default: 0, // session
    },
  }),

  blacklist: ["loading", "err"],
};

export default combineReducers({
  auth: persistReducer(persistConfig, auth),
  carteira,
  cotacao,
  itens,
  lancamentos,
  user
});
