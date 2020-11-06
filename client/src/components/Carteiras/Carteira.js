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
import {
  carteiraActions,
  lancamentosActions,
  userActions,
} from "../../redux/actions";
import EditModal from "./EditModal";
import ClearIcon from "@material-ui/icons/Clear";
import { fetchCarteira } from "../../redux/actions/carteiras";
import { useHistory } from "react-router-dom";
import TrocarSenhar from "./TrocarSenha";

const columns = [
  { id: "ca_crt_descricao", label: "Descrição", minWidth: 135 },
  {
    id: "valor_investido",
    label: "Valor Investido",
    minWidth: 100,
    align: "left",
    format: (value) =>
      "R$ " +
      value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
  },
  {
    id: "valor_atual",
    label: "Valor Atual",
    minWidth: 100,
    align: "left",
    // format: (value) => value.toLocaleString("en-US"),
    format: (value) =>
      "R$ " +
      value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
  },
  {
    id: "lucro_prejuizo",
    label: "Lucro/Prejuízo",
    minWidth: 75,
    align: "left",
    // format: (value) => value.toLocaleString("en-US"),
    format: (value) =>
      "R$ " +
      value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
  },
  {
    id: "evolucao",
    label: "Evolução",
    minWidth: 60,
    align: "left",
    // format: (value) => value.toFixed(2),
    format: (value) =>
      value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) + "%",
  },
];

function createData(
  id,
  ca_crt_descricao,
  valor_investido,
  valor_atual,
  ca_crt_ativo
) {
  const lucro_prejuizo =
    valor_atual && valor_investido ? valor_atual - valor_investido : " -- ";
  const evolucao =
    valor_atual && valor_investido
      ? (valor_atual / valor_investido - 1) * 100
      : " -- ";
  return {
    id,
    ca_crt_descricao,
    valor_investido,
    valor_atual,
    lucro_prejuizo,
    evolucao,
    ca_crt_ativo,
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

const Carteira = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const history = useHistory();
  const searchShow = true;

  const {
    openModal,
    modalOpen,
    loadingCarteiras,
    user2,
    handleChangeCarteiraTerm,
    buscaTerm,
    status,
  } = props;

  const busca = handleChangeCarteiraTerm;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const {
    fetchCarteiras,
    carteiras,
    user,
    deleteCarteira,
    carteira,
    fetchCarteira,
    lancamento,
    handleChangeLancamento,
    openModalSenha
  } = props;

  useEffect(() => {
    fetchCarteiras(user.id, buscaTerm);
  }, [fetchCarteiras, user.id, status, buscaTerm]);

  const rows = (carteiras.data || []).map((item) => {
    return createData(
      item.id,
      item.ca_crt_descricao,
      item.valor_investido,
      item.valor_atual,
      item.ca_crt_ativo
    );
  });

  return (
    <>
      <Header title={"Lista de carteiras de ações"} busca={busca} searchShow={searchShow}/>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Button
            variant="contained"
            style={{ marginTop: 20, marginBottom: 20 }}
            className="botao_verde_claro"
            onClick={() => {
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
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  // key={column.id}
                  align="left"
                  // style={{ minWidth: column.minWidth }}
                >
                  {"Status"}
                </TableCell>
                <TableCell align="left">{"Ações"}</TableCell>
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
                      key={row.ca_crt_descricao}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell align="left">
                        {row.ca_crt_ativo ? (
                          <CheckIcon className={classes.checkButton} />
                        ) : (
                          <ClearIcon className={classes.inactiveButton} />
                        )}
                      </TableCell>
                      <TableCell align="left">
                        <IconButton
                          onClick={() => {
                            handleChangeLancamento({
                              ...lancamento,
                              ca_crt_codigo: row.id,
                            });
                            history.push(`/ativos/${row.id}`);
                          }}
                        >
                          <Tooltip title="Ativos">
                            <Ativos />
                          </Tooltip>
                        </IconButton>

                        <IconButton
                          onClick={() => {
                            fetchCarteira(row.id);
                          }}
                        >
                          <Tooltip title="Editar">
                            <EditIcon />
                          </Tooltip>
                        </IconButton>

                        <IconButton
                          onClick={() => {
                            deleteCarteira(row.id);
                            fetchCarteiras(user.id);
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
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <EditModal />
      {/* <TrocarSenhar /> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  carteiras: state.carteira.carteiras,
  carteira: state.carteira.carteira,
  status: state.carteira.status,
  buscaTerm: state.carteira.buscaTerm,
  lancamento: state.lancamentos.lancamento,
  modalOpen: state.carteira.modalOpen,
  user: state.auth.user,
  user2: state.user.user,
  loadingCarteiras: state.carteira.loadingCarteiras,
  token: state.auth.token,
  err: state.auth.err,
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCarteira: (id) => {
      dispatch(carteiraActions.fetchCarteira(id));
    },
    fetchCarteiras: (userId, term) => {
      dispatch(carteiraActions.fetchCarteiras(userId, term));
    },
    deleteCarteira: (id) => {
      dispatch(carteiraActions.deleteCarteira(id));
    },
    openModal: () => {
      dispatch(carteiraActions.openModal());
    },
    handleChangeLancamento: (lancamento) => {
      dispatch(lancamentosActions.handleChangeLancamento(lancamento));
    },
    handleChangeCarteiraTerm: (term) => {
      dispatch(carteiraActions.handleChangeCarteiraTerm(term));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Carteira);
