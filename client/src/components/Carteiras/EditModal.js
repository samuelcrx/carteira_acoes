import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { connect } from "react-redux";
import { carteiraActions, messageActions } from "../../redux/actions";
import classNames from "classnames";
import Carteira from "./Carteira";

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
  },
  descInput: {
    width: "100%",
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
}));

const EditModal = (props) => {
  const classes = useStyles();

  const {
    modalOpen,
    closeModal,
    resetState,
    carteira,
    handleChangeCarteira,
    user,
    fetchCarteiras,
    addCarteira,
    editCarteira,
    changeMessage,
  } = props;

  const onSubmit = async (carteira, ca_usu_codigo) => {
    if (!carteira.id) {
      try {
        await addCarteira(carteira, ca_usu_codigo);
        const message = "Carteira criada com sucesso.";
        changeMessage({ message });
        resetState();
      } catch (error) {
        const message = "Algo deu errado.";
        changeMessage({ message });
      }
    } else {
      try {
        await editCarteira(carteira);
        const message = "Carteira editada com sucesso.";
        changeMessage({ message });
        resetState();
      } catch (error) {
        const message = "Algo deu errado.";
        changeMessage({ message });
      }
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
                <p className={classes.titleText}>Carteira de Ações</p>
              </div>
              <div className={classes.btContainer}>
                <Button
                  className={classNames(classes.btBack, "botao_verde_escuro")}
                  onClick={() => {
                    closeModal();
                  }}
                >
                  Voltar
                </Button>
                <Button
                  className={classNames(classes.btSave, "botao_roxo")}
                  type={"submit"}
                  onClick={() => {
                    onSubmit(carteira, user.id);
                    resetState();
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
                      <FormLabel className={classes.descriptionText}>
                        Descrição
                      </FormLabel>
                      <div className={classes.inputCheck}>
                        <FormControl
                          className={classes.descInput}
                          autoFocus
                          type="text"
                          placeholder="Digite o nome da carteira"
                          value={carteira.ca_crt_descricao}
                          onChange={(e) =>
                            handleChangeCarteira({
                              ...carteira,
                              ca_crt_descricao: e.target.value,
                            })
                          }
                        />
                        <p className={classes.textCheckbox}>Ativo</p>
                        <input
                          name="Ativo"
                          type="checkbox"
                          className={classes.checkActive}
                          checked={carteira.ca_crt_ativo}
                          onChange={(e) => {
                            // setIsActive(!isActive);
                            handleChangeCarteira({
                              ...carteira,
                              ca_crt_ativo: e.target.checked,
                            });
                          }}
                        />
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
  modalOpen: state.carteira.modalOpen,
  carteira: state.carteira.carteira,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCarteira: (id) => {
      dispatch(carteiraActions.fetchCarteira(id));
    },
    fetchCarteiras: (userId) => {
      dispatch(carteiraActions.fetchCarteiras(userId));
    },
    handleChangeCarteira: (carteira) => {
      dispatch(carteiraActions.handleChangeCarteira(carteira));
    },
    addCarteira: (carteira, ca_usu_codigo) => {
      dispatch(carteiraActions.addCarteira(carteira, ca_usu_codigo));
    },
    editCarteira: (carteira) => {
      dispatch(carteiraActions.editCarteira(carteira));
    },
    closeModal: () => {
      dispatch(carteiraActions.closeModal());
    },
    resetState: () => {
      dispatch(carteiraActions.resetState());
    },
    changeMessage: ({ message, anchorOrigin }) => {
      dispatch(messageActions.changeMessage({ message, anchorOrigin }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
