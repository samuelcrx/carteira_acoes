import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import { connect } from "react-redux";
import { authActions, userActions, messageActions } from "../redux/actions";
import Typography from "@material-ui/core/Typography";
const Logo = require("../assets/logo.jpg");

const useStyles = makeStyles((theme) => ({
  resetPassLink: {
    margin: "16px 16px",
  },
}));

const Login = (props) => {
  const { token } = props;
  const classes = useStyles();
  const history = useHistory();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [singinTouched, setSinginTouched] = useState(false);

  const validateForm = () => {
    return login && password;
  };

  const { userLogin, user, openModalSenha, changeMessage } = props;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (login && password) {
      const ca_usu_login = login;
      const ca_usu_cripto = password;

      try {
        const data = await userLogin({ ca_usu_login, ca_usu_cripto });
        if (data.token) {
          if (data.user.reset_password) {
            openModalSenha();
          }
          history.push("/carteiras");
          const message = "Usuário autenticado com sucesso.";
          changeMessage({ message });
        }
      } catch (error) {
        const message = "Usuário ou senha incorretos.";
        changeMessage({ message });
      }
    }
  };

  return (
    <div className="Container">
      <div className="SubContainer posicaoLogin">
        <div className="Logo">
          <img src={Logo} alt="Logo" className="imagemLogo" />
        </div>
        <form className="formulario" onSubmit={(e) => onSubmit(e)}>
          <FormGroup className="FormLogin" controlId="login">
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
          <FormGroup controlId="password" className="FormNome">
            <FormLabel className="TextPass">Senha</FormLabel>
            <FormControl
              className="InputPass"
              type="password"
              placeholder="Digite sua Senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormGroup>
          <FormGroup className="FormNome">
            <Button
              className={validateForm() ? "ButtonLogin" : "ButtonLoginDisabled"}
              block
              disabled={!validateForm()}
              type="submit"
            >
              Entrar
            </Button>
          </FormGroup>
          <Link className="LinkAuth" to="/cadastro">
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
          <Link to="/recuperar-senha">
            <Typography className={classes.resetPassLink} color={"primary"}>
              Esqueci minha senha
            </Typography>
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
  user: state.user.user,
  token: state.auth.token,
  err: state.auth.err,
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: ({ ca_usu_login, ca_usu_cripto }) => {
      return dispatch(authActions.login({ ca_usu_login, ca_usu_cripto }));
    },
    openModalSenha: () => {
      dispatch(userActions.openModal());
    },
    changeMessage: ({ message, anchorOrigin }) => {
      dispatch(messageActions.changeMessage({ message, anchorOrigin }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
