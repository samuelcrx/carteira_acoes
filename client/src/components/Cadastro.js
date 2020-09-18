import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Cadastro.css";
import "./Login.css";

import { connect } from "react-redux";
import { userActions } from "../redux/actions";

const Logo = require("../assets/logo.jpg");

const Cadastro = (props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [singinTouched, setSinginTouched] = useState(false);

  const { user, handleChangeUser, cadastro } = props;

  const validateForm = () => {
    return user.ca_usu_login.length > 0 && user.ca_usu_cripto.length > 0;
  };

  const onSubmit = () => {
    cadastro(user)
  };


  return (
    <div className="Container">
      <div className="SubContainer marginTop">
        <div className="Logo">
          <img src={Logo} alt="Logo" className="imagemLogo" />
        </div>
        <form className="formulario" onSubmit={() => onSubmit()}>
          <FormGroup className="FormNome" controlId="nome" bsSize="large">
            <FormLabel className="TextLogin">Nome</FormLabel>
            <FormControl
              className="InputLogin"
              autoFocus
              type="text"
              placeholder="Digite seu Nome"
              value={user.ca_usu_nome}
              onChange={(e) =>
                handleChangeUser({ ...user, ca_usu_nome: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup className="FormLogin" controlId="login" bsSize="large">
            <FormLabel className="TextLogin">Login</FormLabel>
            <FormControl
              className="InputLogin"
              type="email"
              placeholder="Digite seu E-mail"
              value={user.ca_usu_login}
              onChange={e => handleChangeUser({ ...user, ca_usu_login: e.target.value })}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel className="TextPass">Senha</FormLabel>
            <FormControl
              className="InputPass"
              type="password"
              placeholder="Digite sua Senha"
              value={user.ca_usu_cripto}
              onChange={e => handleChangeUser({ ...user, ca_usu_cripto: e.target.value })}
            />
          </FormGroup>
          <Button
            className={validateForm() ? "ButtonLogin" : "ButtonLoginDisabled"}
            block
            bsSize="large"
            disabled={!validateForm()}
            type="submit"
          >
            Cadastrar
          </Button>
          <Link className="LinkAuth" to="/">
            <p
              className={
                singinTouched ? "TextSingin TextSinginTouched" : "TextSingin"
              }
              onMouseUp={() => setSinginTouched(false)}
              onMouseDown={() => setSinginTouched(true)}
            >
              Ja possui uma conta? Entrar
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    cadastro: (user) => {
      return dispatch(userActions.addUser(user));
    },

    handleChangeUser: (user) => {
      dispatch(userActions.handleChangeUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cadastro);
