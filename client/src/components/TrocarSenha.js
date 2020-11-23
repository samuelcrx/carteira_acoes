import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { connect } from "react-redux";
import { carteiraActions, userActions, mesageActions } from "../redux/actions";
import classNames from "classnames";
import { addCarteira } from "../../api/carteira";
import { editCarteira } from "../../redux/actions/carteiras";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  container: {
    width: "730px",
    height: "320px",
    left: "0px",
    top: "0px",
    background: "#343A40",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    width: "700px",
    height: "277px",
    left: "16px",
    top: "20px",
    background: "#37404A",
    boxShadow: "0px 2px 1px rgba(0,0,0,0.25)",
  },
  titleContainer: {
    width: "100%",
    height: "36px",
    background: "#3c4858",
    boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
    display: "flex",
    alignItems: "center",
  },
  titleText: {
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "19px",
    paddingLeft: "12px",
    // display: 'flex',
    // alignItems: 'center',
    color: "white", //'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #AAB8C5'
  },
  btBack: {
    background: "#0F7979",
    borderRadius: "8px",
    color: "white",
    top: "20px",
    left: "20px",
    "btBack:hover": {
      background: "orange",
    },
  },
  btSave: {
    background: "#727CF5",
    borderRadius: "8px",
    color: "white",
    top: "20px",
    left: "30%",
  },
  btExclude: {
    background: "#FA5C7C",
    borderRadius: "8px",
    color: "white",
    top: "20px",
    left: "33%",
  },
  btContainer: {
    top: "20px",
  },
  dataContainer: {
    background: "#394451",
    border: "1px",
    boxSizing: "border-box",
    boxShadow: "inset 0px 0px 2px rgba(0, 0, 0, 0.25)",
    width: "auto",
    marginLeft: "20px",
    marginRight: "20px",
    height: "40%",
    marginTop: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dataSubContainer: {
    width: "80%",
    height: "50%",
  },
  form: {},
  descForm: {
    width: "100%",
    height: "auto",
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
  },
  descInput: {
    width: "auto",
    height: "auto",
    maxHeight: 20,
    background: "#37404A",
    borderRadius: 4,
    padding: 4,
    color: "rgb(207, 203, 203)",
  },
  descriptionText: {
    fontFamily: "Nunito",
    fontSize: "14px",
    fontStyle: "normal",
    marginTop: "0px",
    display: "flex",
    flexDirection: "row",
    color: "#8492A6",
    // padding: 8,
  },
  textCheckbox: {
    paddingLeft: "15px",
    display: "flex",
    paddingRight: 8,
    color: "rgb(207, 203, 203)",
  },
  inputCheck: {
    height: "auto",
    display: "flex !important",
    flexDirection: "row",
    alignItems: "center",
  },
  checkActive: {
    paddingRight: 4,
    marginRight: 5,
  },
  empresa: {
    marginLeft: "40px",
  },
}));

const TrocarSenha = (props) => {
  const classes = useStyles();
  const [pass, setPass] = React.useState("");

  const handleNewPassword = (pass) => {
    setPass(pass);
  };

  const {
    modalOpen,
    closeModal,
    resetState,
    carteira,
    handleChangeUser,
    user,
    fetchCarteiras,
    editCarteira,
    updatePassword,
    changeMessage,
  } = props;

  const onSubmit = async (user) => {
    if (user.ca_usu_cripto === pass) {
      try {
        await updatePassword(user);
        const message = "Senha recuperada com sucesso.";
        changeMessage({ message });
        closeModal();
      } catch (error) {
        const message = "Algo deu errado na alteração da senha.";
        changeMessage({ message });
      }
    } else {
      const message = "As senhas estão diferentes.";
      changeMessage({ message });
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          {/* <div className={classes.paper}> */}
          <div className={classes.container}>
            <div className={classes.subContainer}>
              <div className={classes.titleContainer}>
                <p className={classes.titleText}>Trocar Senha</p>
              </div>
              <div className={classes.btContainer}>
                <Button
                  className={classNames(classes.btSave, "botao_roxo")}
                  type={"submit"}
                  onClick={() => {
                    onSubmit(user);
                  }}
                >
                  Salvar
                </Button>
              </div>
              <div className={classes.dataContainer}>
                <div className={classes.dataSubContainer}>
                  {/* <p className={classes.descriptionText}>Descrição</p> */}
                  <form className={classes.form}>
                    <FormGroup className={classes.descForm} controlId="desc">
                      <div className={classes.inputCheck}>
                        <div className={classes.ticker}>
                          <FormLabel className={classes.descriptionText}>
                            Nova Senha
                          </FormLabel>
                          <FormControl
                            className={classes.descInput}
                            autoFocus
                            type="password"
                            placeholder="Digite nova senha"
                            value={user.ca_usu_cripto}
                            onChange={(e) =>
                              handleChangeUser({
                                ...user,
                                ca_usu_cripto: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className={classes.empresa}>
                          <FormLabel className={classes.descriptionText}>
                            Confirmar nova senha
                          </FormLabel>
                          <FormControl
                            className={classes.descInput}
                            autoFocus
                            type="password"
                            placeholder="Confirme a nova senha"
                            value={pass}
                            onChange={(e) => handleNewPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </FormGroup>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </Fade>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  modalOpen: state.user.modalOpen,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCarteira: (id) => {
      dispatch(carteiraActions.fetchCarteira(id));
    },
    fetchCarteiras: (userId) => {
      dispatch(carteiraActions.fetchCarteiras(userId));
    },
    handleChangeUser: (user) => {
      dispatch(userActions.handleChangeUser(user));
    },
    addCarteira: (carteira, ca_usu_codigo) => {
      dispatch(carteiraActions.addCarteira(carteira, ca_usu_codigo));
    },
    updatePassword: (user) => {
      dispatch(userActions.updatePassword(user));
    },
    closeModal: () => {
      dispatch(userActions.closeModal());
    },
    resetState: () => {
      dispatch(carteiraActions.resetState());
    },
    changeMessage: ({ message, anchorOrigin }) => {
      dispatch(messageActions.changeMessage({ message, anchorOrigin }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrocarSenha);
