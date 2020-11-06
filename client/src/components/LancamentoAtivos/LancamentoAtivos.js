import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Header from "../Menu/menu";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
// import ActionDelete from 'material-ui/svg-icons/action/delete'
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import Delete from "@material-ui/icons/DeleteOutline";
import Ativos from "@material-ui/icons/Assignment";
import ContentAdd from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { lancamentosActions } from "../../redux/actions";
import EditModal from "./EditModal";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import moment from "moment";

const columns = [
  { id: "ticker", label: "Ticker", minWidth: 60 },
  {
    id: "data",
    label: "Data",
    minWidth: 135,
  },
  {
    id: "compra_venda",
    label: "Compra/Venda",
    minWidth: 45,
    align: "left",
    format: (value) => (value == "C" ? "Compra" : "Venda"),
  },
  {
    id: "ca_crm_quantidade",
    label: "Quantidade",
    minWidth: 75,
    align: "left",
    format: (value) => value,
  },
  {
    id: "ca_crm_valor",
    label: "Valor",
    minWidth: 60,
    align: "left",
    // format: (value) => {
    //   value.toFixed(2);
    //   return `R$ ${value}`;
    //},
    format: (value) =>
      "R$ " +
      value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
  },
];

function createData(
  id,
  createdAt,
  ca_crm_compra_venda,
  ca_crm_quantidade,
  ca_crm_valor,
  updatedAt,
  carteira_id,
  acao_id
) {
  const ticker = acao_id.ca_aco_ticker;
  const data = moment(updatedAt).format("l");
  const compra_venda = ca_crm_compra_venda;

  return {
    id,
    ticker,
    data,
    compra_venda,
    ca_crm_quantidade,
    ca_crm_valor,
  };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 1300,
    margin: "45px auto",
    borderRadius: 8,
    backgroundColor: "#3c4858",
  },
  container: {
    maxHeight: 440,
    textAlign: "center",
    background: "#3c4858",
    borderRadius: 8,
  },
  ContainedSecondary: {
    marginTop: 20,
  },
  stickyHeader: {
    background: "red",
  },
  checkButton: {
    color: "#00ff3d !important",
  },
  newButtonIcon: {
    color: "#fff !important",
    maxWidth: 20,
    width: "100%",
    padding: 2,
  },
  btnVoltar: {
    color: "#fff",
  },
  inativa: {
    color: "#fff",
    textAlign: "center",
    padding: 8,
  },
});

const AtivosTable = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { carteiraId, acaoCodigo } = props.match.params;
  // const { dados } = props.location.state

  const history = useHistory();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const {
    fetchLancamentos,
    lancamentos,
    openModal,
    deleteLancamento,
    lancamento,
    fetchLancamento,
    resetState,
    modalOpen,
    status,
    handleChangeLancamentoTerm,
    buscaTerm,
  } = props;

  const busca = handleChangeLancamentoTerm;

  useEffect(() => {
    fetchLancamentos(carteiraId, acaoCodigo, buscaTerm);
  }, [acaoCodigo, carteiraId, fetchLancamentos, status, buscaTerm]);

  const rows = (lancamentos.data || []).map((lancamento) => {
    return createData(
      lancamento.id,
      lancamento.createdAt,
      lancamento.ca_crm_compra_venda,
      lancamento.ca_crm_quantidade,
      lancamento.ca_crm_valor,
      lancamento.updatedAt,
      lancamento.carteira_id,
      lancamento.acao_id
    );
  });

  return (
    <>
      <Header title={"Lançamentos"} busca={busca} />
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Button
            variant="contained"
            className={classNames(classes.btnVoltar, "botao_verde_escuro")}
            style={{
              marginTop: 20,
              marginBottom: 20,
              marginLeft: 20,
              float: "left",
            }}
            onClick={() => {
              resetState();
              history.goBack(`/ativos/${carteiraId}`);
            }}
          >
            Voltar
          </Button>
          <Button
            variant="contained"
            style={{ marginTop: 20, marginBottom: 20, marginLeft: -20 }}
            className="botao_verde_claro"
            onClick={() => {
              openModal();
            }}
          >
            Novo
          </Button>
          {rows.length ? (
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, textAlign: "center" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell style={{ textAlign: "center" }}>
                    {"Ações"}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ textAlign: "center" }}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                        <TableCell align="left">
                          <IconButton
                            onClick={() => {
                              fetchLancamento(row.id);
                            }}
                          >
                            <Tooltip title="Editar">
                              <EditIcon />
                            </Tooltip>
                          </IconButton>

                          <IconButton
                            onClick={() => {
                              deleteLancamento(row.id);
                            }}
                          >
                            <Tooltip title="Deletar">
                              <Delete />
                            </Tooltip>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          ) : (
            <p className={classes.inativa}>
              Desculpe, ainda não há lançamentos D:
            </p>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 15, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage ? rowsPerPage : 5}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <EditModal carteiraId={carteiraId} acaoCodigo={acaoCodigo} edit={false} />
    </>
  );
};

const mapStateToProps = (state) => ({
  lancamentos: state.lancamentos.lancamentos,
  lancamento: state.lancamentos.lancamento,
  buscaTerm: state.lancamentos.buscaTerm,
  modalOpen: state.lancamentos.modalOpen,
  status: state.lancamentos.refreshAtivos,
  token: state.auth.token,
  err: state.auth.err,
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLancamento: (id) => {
      dispatch(lancamentosActions.fetchLancamento(id));
    },
    fetchLancamentos: (carteiraId, acaoCodigo, term) => {
      dispatch(
        lancamentosActions.fetchLancamentos(carteiraId, acaoCodigo, term)
      );
    },
    deleteLancamento: (id) => {
      dispatch(lancamentosActions.deleteLancamento(id));
    },
    openModal: () => {
      dispatch(lancamentosActions.openModal());
    },
    resetState: () => {
      dispatch(lancamentosActions.resetState());
    },
    handleChangeLancamentoTerm: (term) => {
      dispatch(lancamentosActions.handleChangeLancamentoTerm(term));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AtivosTable);
