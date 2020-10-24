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
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import Delete from "@material-ui/icons/DeleteOutline";
import Ativos from "@material-ui/icons/Assignment";
import ContentAdd from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { cotacoesActions } from "../../redux/actions";
import EditModal from "./EditModal";
import ClearIcon from "@material-ui/icons/Clear";
import classNames from "classnames";
import moment from "moment";

const columns = [
  { id: "ca_aco_ticker", label: "Ticker", minWidth: 100 },
  { id: "data", label: "Data", minWidth: 100 },
  { id: "ca_acc_valor", label: "Valor", minWidth: 100 },
];

function createData(
  id,
  acao_id,
  createdAt,
  ca_acc_valor,
  ca_usu_codigo,
  ca_aco_codigo
) {
  const data = moment(createdAt).format("l");
  const ca_aco_ticker = acao_id.ca_aco_ticker;
  return {
    id,
    acao_id,
    ca_aco_ticker,
    data,
    ca_acc_valor,
    ca_usu_codigo,
    ca_aco_codigo,
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
  inactiveButton: {
    color: "#ff0000 !important",
  },
  newButtonIcon: {
    color: "#fff !important",
    maxWidth: 20,
    width: "100%",
    padding: 2,
  },
});

const Cotacao = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { openModal, cotacao, resetState } = props;
  const history = useHistory();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const {
    fetchCotacoes,
    cotacoes,
    user,
    fetchCotacao,
    handleChangeCotacao,
    restartTable
  } = props;
  
  const { acoCodigo, carteiraId } = props.match.params;
  const { acao_id } = props.location.state;

  useEffect(() => {

    fetchCotacoes(user.id, acoCodigo);

  }, [acoCodigo, fetchCotacoes, user.id, restartTable]);

  const rows = (cotacoes.data || []).map((item) => {
    return createData(
      item.id,
      item.acao_id,
      item.createdAt,
      item.ca_acc_valor,
      item.ca_usu_codigo,
      item.ca_aco_codigo
    );
  });

  return (
    <>
      <Header title={"Lista das cotações de ações"} />
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
            style={{ marginTop: 20, marginBottom: 20 }}
            color="secondary"
            onClick={() => {
              handleChangeCotacao({
                ...cotacao,
                acao_id: acao_id,
              });
              openModal();
            }}
          >
            Novo
          </Button>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={"center"}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="center">{"Ações"}</TableCell>
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
                      key={row.ca_aco_ticker}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={"center"}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell align="center">
                        <IconButton>
                          <Tooltip title="Editar">
                            <EditIcon
                              onClick={() => {
                                fetchCotacao(row.id);
                              }}
                            />
                          </Tooltip>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <EditModal userId={user.id} acoCodigo={acoCodigo} />
    </>
  );
};

const mapStateToProps = (state) => ({
  cotacoes: state.cotacao.cotacoes,
  cotacao: state.cotacao.cotacao,
  modalOpen: state.carteira.modalOpen,
  restartTable: state.cotacao.restartTable,
  user: state.auth.user,
  loadingCarteiras: state.carteira.loadingCarteiras,
  token: state.auth.token,
  err: state.auth.err,
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCotacao: (id) => {
      dispatch(cotacoesActions.fetchCotacao(id));
    },
    fetchCotacoes: (userId, acoCodigo) => {
      dispatch(cotacoesActions.fetchCotacoes(userId, acoCodigo));
    },
    deleteCotacao: (id) => {
      dispatch(cotacoesActions.deleteCotacao(id));
    },
    openModal: () => {
      dispatch(cotacoesActions.openModal());
    },
    resetState: () => {
      dispatch(cotacoesActions.resetState());
    },
    handleChangeCotacao: (cotacao) => {
      dispatch(cotacoesActions.handleChangeCotacao(cotacao));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cotacao);
