import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import Carteira from "./components/Carteiras/Carteira";
import EditModal from "./components/Carteiras/EditModal";
import AtivosTable from "./components/Ativos/Ativos";
import Acoes from "./components/Acoes/Acoes";

import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "dotenv/config";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import CircularProgress from "@material-ui/core/CircularProgress";
import LancamentoAtivos from "./components/LancamentoAtivos/LancamentoAtivos";
import Cotacao from "./components/Cotacao/Cotacao";
import Perfil from "./components/Perfil/Perfil";
import TrocarSenha from "./components/Perfil/TrocarSenha";
import RecuperarSenha from "./components/RecuperarSenha";
import Message from "./components/Message";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<CircularProgress />} persistor={persistor}>
        <Message />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/cadastro" component={Cadastro} />
            <Route path="/carteiras" component={Carteira} />
            <Route path="/edita-carteira" component={EditModal} />
            <Route path="/ativos/:carteiraId" component={AtivosTable} />
            <Route path="/acoes" component={Acoes} />
            <Route
              path="/lancamentos-ativos/:carteiraId/:acaoCodigo"
              component={LancamentoAtivos}
            />
            <Route
              path="/cotacoes/:acoCodigo/:carteiraId"
              component={Cotacao}
            />
            <Route path="/recuperar-senha" component={RecuperarSenha} />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
