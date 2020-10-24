import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { connect } from "react-redux";
import { lancamentosActions, carteiraItensActions } from "../../redux/actions";
import classNames from "classnames";
import { addCarteira } from "../../api/carteira";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import api from "../../api/connectionProxy";
import ReactSelect from "react-select/async";
import TextField from "@material-ui/core/TextField/TextField";
import {
  formatContentSelectValueSingle,
  filterOptionsFunction,
} from "../../utils";
import * as API from "../../api";

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
    // padding: theme.spacing(2, 4, 3),
  },
  container: {
    width: "730px",
    height: "420px",
    left: "0px",
    top: "0px",
    background: "#343A40",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    width: "700px",
    height: "377px",
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
    alignItems: "center",
    marginLeft: "20px",
    marginRight: "20px",
    height: "50%",
    marginTop: "40px",
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
    marginBottom: 4,
    marginTop: 0,
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
    width: "100%",
    height: "auto",
    flexDirection: "column",
    alignItems: "left",
  },
  checkActive: {
    paddingRight: 4,
    marginRight: 5,
  },
  empresa: {
    marginLeft: "40px",
  },
  containerCheck: {
    display: "flex",
    flexDirection: "row",
  },
  containerQtdValor: {
    display: "flex",
    flexDirection: "row",
    marginTop: "20px",
  },
  checks: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginLeft: 70,
  },
}));

const EditModal = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState();
  const [term, setTerm] = React.useState();

  async function loadAcoes() {
    const response = await api.http.get(`/acoes/${filter}`);

    setFilter(response.data);

    loadAcoes();
  }

  const loadAcoesBusca = useCallback(async (term) => {
    const response = await api.http
      .get("/acoes", {
        params: {
          term,
        },
      })
      .then((acoes) => {
        const options = acoes.data.map((acao) => ({
          value: acao.id,
          label: acao.ca_aco_ticker,
        }));
        return options;
      })
      .catch(() => {
        console.log("Erro ao buscar niveis de ensino");
      });
    return response;
  }, []);

  const saveTerm = (selectedOption) => {
    setTerm(selectedOption);
    handleChangeLancamento({
      ...lancamento,
      ca_aco_codigo: selectedOption.value,
      acao_id: {
        id: selectedOption.value,
        ca_aco_ticker: selectedOption.label,
      },
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const {
    modalOpen,
    closeModal,
    resetState,
    lancamento,
    handleChangeLancamento,
    user,
    fetchItens,
    editLancamento,
    addLancamento,
    fetchLancamentos,
    carteiraId,
    acaoCodigo,
    edit
  } = props;

  const onSubmit = async (lancamento) => {
    console.log(lancamento)

    if (!lancamento.id) {
      try {
        handleChangeLancamento({...lancamento, ca_crt_codigo: props.carteiraId});
        await addLancamento(lancamento);
        if (edit) {
          resetState()
        } else {
          handleChangeLancamento({...lancamento, ca_crm_compra_venda: "", ca_crm_quantidade: 0, ca_crm_valor: 0})
        }
        closeModal()
      } catch (error) {
        alert(error)
        
      }

    } else {

      handleChangeLancamento({...lancamento, ca_crt_codigo: props.carteiraId});
      console.log(lancamento)
      await editLancamento(lancamento);
      // const refresh = await fetchLancamentos(lancamento.ca_crt_codigo, lancamento.acao_id.id);
        closeModal()
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
                <p className={classes.titleText}>Compra/Venda de Ativos</p>
              </div>
              <div className={classes.btContainer}>
                <Button
                  className={classNames(classes.btBack, "botao_verde_escuro")}
                  onClick={() => {
                    fetchLancamentos(carteiraId, acaoCodigo);
                    closeModal();
                  }}
                >
                  Voltar
                </Button>
                <Button
                  className={classNames(classes.btSave, "botao_roxo")}
                  type={"submit"}
                  onClick={() => {
                    onSubmit(lancamento, user.id);
                    // resetState();
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
                        <div className={classes.containerCheck}>
                          <div>
                            <FormLabel className={classes.descriptionText}>
                              Ticker
                            </FormLabel>
                            <ReactSelect
                              noOptionsMessage={() => "Nenhuma ação encontrada"}
                              autoFocus
                              loadOptions={loadAcoesBusca}
                              name="Ticker"
                              defaultOptions
                              onChange={saveTerm}
                              value={formatContentSelectValueSingle(
                                lancamento.acao_id
                              )}
                              styles={{ maxWidth: "85px" }}
                            ></ReactSelect>
                          </div>
                          <div className={classes.checks}>
                            <InputLabel
                              id="demo-controlled-open-select-label"
                              className={classes.descriptionText}
                            >
                              Operação
                            </InputLabel>
                            <Select
                              labelId="demo-controlled-open-select-label"
                              id="demo-controlled-open-select"
                              open={open}
                              onClose={handleClose}
                              onOpen={handleOpen}
                              value={lancamento.ca_crm_compra_venda}
                              style={{
                                border: "1px solid #c5c6c6",
                                padding: "2px",
                                borderRadius: "4px",
                                color: "#b5bfbe",
                                fontFamily: "Nunito",
                                marginTop: "2px",
                              }}
                              onChange={(e) => {
                                handleChangeLancamento({
                                  ...lancamento,
                                  ca_crm_compra_venda: e.target.value,
                                });
                              }}
                            >
                              <MenuItem value={"C"}>Compra</MenuItem>
                              <MenuItem value={"V"}>Venda</MenuItem>
                            </Select>
                          </div>
                        </div>
                        <div className={classes.containerQtdValor}>
                          <div>
                            <FormLabel className={classes.descriptionText}>
                              Quantidade
                            </FormLabel>
                            <FormControl
                              className={classes.descInput}
                              type="number"
                              placeholder="Digite a quantidade"
                              value={lancamento.ca_crm_quantidade}
                              onChange={(e) =>
                                handleChangeLancamento({
                                  ...lancamento,
                                  ca_crm_quantidade: parseInt(e.target.value, 10),
                                })
                              }
                            />
                          </div>
                          <div className={classes.empresa}>
                            <FormLabel className={classes.descriptionText}>
                              Valor
                            </FormLabel>
                            <FormControl
                              className={classes.descInput}
                              type="number"
                              placeholder="Digite o valor"
                              value={lancamento.ca_crm_valor}
                              onChange={(e) => {
                                handleChangeLancamento({
                                  ...lancamento,
                                  ca_crm_valor: parseFloat(e.target.value),
                                })
                              }}
                            />
                          </div>
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
  modalOpen: state.lancamentos.modalOpen,
  lancamento: state.lancamentos.lancamento,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLancamento: (id) => {
      dispatch(lancamentosActions.fetchLancamento(id));
    },
    fetchItens: (id) => {
      dispatch(carteiraItensActions.fetchItens(id));
    },
    handleChangeLancamento: (lancamento) => {
      dispatch(lancamentosActions.handleChangeLancamento(lancamento));
    },
    addLancamento: (lancamento) => {
      dispatch(lancamentosActions.addLancamento(lancamento));
    },
    editLancamento: (lancamento) => {
      dispatch(lancamentosActions.editLancamento(lancamento));
    },
    closeModal: () => {
      dispatch(lancamentosActions.closeModal());
    },
    resetState: () => {
      dispatch(lancamentosActions.resetState());
    },
    fetchLancamentos: (carteiraId, acaoCodigo) => {
      dispatch(lancamentosActions.fetchLancamentos(carteiraId, acaoCodigo));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
