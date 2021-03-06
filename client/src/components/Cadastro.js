import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { userActions, messageActions } from "../redux/actions";

const Logo = require("../assets/logo.jpg");

const Cadastro = (props) => {
  const [singinTouched, setSinginTouched] = useState(false);

  const { user, handleChangeUser, cadastro, changeMessage } = props;

  const history = useHistory();

  const validateForm = () => {
    return user.ca_usu_login && user.ca_usu_cripto.length;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await cadastro(user);
      const message = "Usuário cadastrado com sucesso.";
      changeMessage({ message });
      history.push("/");
      
    } catch (error) {
      const message = "Algo deu errado.";
      changeMessage({ message });
    }
  };

  return (
    <div className="Container">
      <div className="SubContainer marginTop">
        <div className="Logo">
          <img src={Logo} alt="Logo" className="imagemLogo" />
        </div>
        <form className="formulario" onSubmit={onSubmit}>
          <FormGroup className="FormNome" controlId="nome">
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
          <FormGroup className="FormLogin" controlId="login">
            <FormLabel className="TextLogin">Login</FormLabel>
            <FormControl
              className="InputLogin"
              type="email"
              placeholder="Digite seu E-mail"
              value={user.ca_usu_login}
              onChange={(e) =>
                handleChangeUser({ ...user, ca_usu_login: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup controlId="password" className="FormNome">
            <FormLabel className="TextPass">Senha</FormLabel>
            <FormControl
              className="InputPass"
              type="password"
              placeholder="Digite sua Senha"
              value={user.ca_usu_cripto}
              onChange={(e) =>
                handleChangeUser({ ...user, ca_usu_cripto: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup className="FormNome">
            <Button
              className={validateForm() ? "ButtonLogin" : "ButtonLoginDisabled"}
              block
              disabled={!validateForm()}
              type="submit"
            >
              Cadastrar
            </Button>
          </FormGroup>
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
    changeMessage: ({ message, anchorOrigin }) => {
      dispatch(messageActions.changeMessage({ message, anchorOrigin }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cadastro);
