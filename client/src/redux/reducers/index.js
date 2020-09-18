import { combineReducers } from "redux";
import { CookieStorage } from "redux-persist-cookie-storage";
import { persistReducer } from "redux-persist";
import Cookies from "cookies-js";

import auth from "./auth";
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
  user
});
