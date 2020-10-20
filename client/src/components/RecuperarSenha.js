import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import "./RecuperarSenha.css";
import { connect } from "react-redux";
import { authActions } from "../redux/actions";
import Typography from "@material-ui/core/Typography";
const Logo = require("../assets/logo.jpg");

const useStyles = makeStyles((theme) => ({
  resetPassLink: {
    margin: "16px 16px",
  },
}));

const RecuperarSenha = (props) => {
  const { token } = props;
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [sended, setSended] = useState(false);

  const validateForm = () => {
    return email.length > 3;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (email) {
      try {
        const emails = await props.resetPasswordByEmail(email);
        setSended(true);
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className="Container">
      <div className="SubContainer posicaoRec">
        <div className="Logo">
          <img src={Logo} alt="Logo" className="imagemLogo" />
        </div>
        {!sended ? (
          <form className="formulario" onSubmit={(e) => onSubmit(e)}>
            <FormGroup className="FormLogin" controlId="login">
              <FormLabel className="TextRecSenha">Nova senha</FormLabel>
              <FormControl
                className="InputLogin"
                autoFocus
                type="email"
                placeholder="Digite seu E-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormGroup>
            <FormGroup className="FormNome">
              <Button
                className={
                  validateForm()
                    ? "ButtonLogin ButtonRec"
                    : "ButtonLoginDisabled ButtonRec"
                }
                block
                disabled={!validateForm()}
                type="submit"
              >
                Recuperar minha Senha
              </Button>
              <Button
                className={"ButtonLogin02 ButtonRec"}
                block
                onClick={() => {
                  history.push("/");
                }}
              >
                Voltar
              </Button>
            </FormGroup>
          </form>
        ) : (
          <>
            <p className="TextRecSenha2">
              Uma nova senha foi enviada para o email inserido.
            </p>
            <Button
              className={"ButtonLogin ButtonRec"}
              block
              onClick={() => {
                history.push("/");
              }}
            >
              Voltar
            </Button>
          </>
        )}
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
    resetPasswordByEmail: (email) => {
      return dispatch(authActions.resetPasswordByEmail(email));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecuperarSenha);
