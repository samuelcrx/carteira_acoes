import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";
import { connect } from "react-redux";
import { authActions } from "../redux/actions";
const Logo = require("../assets/logo.jpg");

const Login = (props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [singinTouched, setSinginTouched] = useState(false);

  const validateForm = () => {
    return login.length > 0 && password.length > 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const ca_usu_login = login;
    const ca_usu_cripto = password;

    props.login({ ca_usu_login, ca_usu_cripto });
    console.log('Dados', props)
  };

  return (
    <div className="Container">
      <div className="SubContainer posicaoLogin">
        <div className="Logo">
          <img src={Logo} alt="Logo" className="imagemLogo" />
        </div>
        <form className="formulario" onSubmit={(e) => onSubmit(e)}>
          <FormGroup className="FormLogin" controlId="login" bsSize="large">
            <FormLabel className="TextLogin">Login</FormLabel>
            <FormControl
              className="InputLogin"
              autoFocus
              type="email"
              placeholder="Digite seu E-mail"
              value={login}
              onChange={(event) => setLogin(event.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel className="TextPass">Senha</FormLabel>
            <FormControl
              className="InputPass"
              type="password"
              placeholder="Digite sua Senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormGroup>
          <Button
            className={validateForm() ? "ButtonLogin" : "ButtonLoginDisabled"}
            block
            bsSize="large"
            disabled={!validateForm()}
            type="submit"
          >
            Entrar
          </Button>
          <Link className='LinkAuth' to="/cadastro">
            <p
              className={
                singinTouched ? "TextSingin TextSinginTouched" : "TextSingin"
              }
              onMouseUp={() => setSinginTouched(false)}
              onMouseDown={() => setSinginTouched(true)}
            >
              Criar Conta
            </p>
          </Link>
        </form>
        {/* <p className='TextLogin'>Login</p>
                <input className='InputLogin'/>
                <p className='TextPass'>Senha</p>
                <input className='InputPass'/>
                <button className='ButtonLogin'>Entrar</button>
                <p onClick={() => alert('ueeeeeee')} className='TextSingin'>Criar Conta</p> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  err: state.auth.err,
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: ({ ca_usu_login, ca_usu_cripto }) => {
      return dispatch(authActions.login({ ca_usu_login, ca_usu_cripto }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
