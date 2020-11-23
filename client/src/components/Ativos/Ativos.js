import React, { useEffect, useState } from "react";
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
  carteiraItensActions,
  lancamentosActions,
  cotacoesActions,
} from "../../redux/actions";
import EditModal from "../LancamentoAtivos/EditModal";
import classNames from "classnames";
import { useHistory, Link } from "react-router-dom";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import LembreteModal from "./LembreteModal";
import * as API from "../../api";

let columns = [
  { id: "ticker", label: "Ticker", minWidth: 60 },
  { id: "empresa", label: "Empresa", minWidth: 135 },
  {
    id: "ca_cri_quantidade",
    label: "Quantidade",
    minWidth: 45,
    align: "left",
    format: (value) => value.toLocaleString("pt-BR"),
  },
  {
    id: "ca_cri_valor_medio",
    label: "Valor Médio",
    minWidth: 75,
    align: "left",
    format: (value) =>
      "R$ " +
      value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
  },
  {
    id: "valor_investido",
    label: "Valor Investido",
    minWidth: 60,
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
    minWidth: 60,
    align: "left",
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
    minWidth: 60,
    align: "left",
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
    format: (value) =>
      value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) + "%",
  },
];
const dataColumns = columns;

function createData(
  id,
  ca_crt_codigo,
  ca_aco_codigo,
  ca_cri_quantidade,
  ca_cri_valor_medio,
  acao_id,
  ca_cotacao,
  ca_crt_min,
  ca_crt_max
) {
  const ticker = acao_id.ca_aco_ticker;
  const empresa = acao_id.ca_aco_nome;
  const valor_investido = ca_cri_quantidade * ca_cri_valor_medio;
  const valor_atual = ca_cri_quantidade * ca_cotacao;
  const lucro_prejuizo = valor_atual ? valor_atual - valor_investido : 0;
  const evolucao = valor_atual ? (valor_atual / valor_investido - 1) * 100 : 0;

  return {
    id,
    ca_aco_codigo,
    ticker,
    empresa,
    ca_cri_quantidade,
    ca_cri_valor_medio,
    valor_investido,
    valor_atual,
    lucro_prejuizo,
    evolucao,
    acao_id,
    ca_crt_min,
    ca_crt_max,
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
  const carteiraId = props.match.params.carteiraId;
  const [create, setCreate] = useState(false);
  const [pdf, setPdf] = useState("");

  const history = useHistory();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function abreTelaPDF(caminhoPDF) {
    window.open(
      caminhoPDF,
      "",
      "toolbar=no, location=no, status=no, menubar=yes, " +
        "scrollbars=yes, resizable=no, width=680, " +
        "height=650, left=180, top=50"
    );
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const {
    fetchItens,
    itens,
    openModal,
    handleChangeLancamento,
    lancamento,
    status,
    handleChangeItemTerm,
    buscaTerm,
    openModalLembrete,
    fetchItemLembrete,
    statusLancamento,
    resetState,
  } = props;

  const busca = handleChangeItemTerm;

  useEffect(() => {
    fetchItens(carteiraId, buscaTerm);
  }, [carteiraId, fetchItens, status, buscaTerm, statusLancamento]);

  let rows = (itens.data || []).map((item) => {
    return createData(
      item.id,
      item.ca_crt_codigo,
      item.ca_aco_codigo,
      item.ca_cri_quantidade,
      item.ca_cri_valor_medio,
      item.acao_id,
      item.ca_cotacao,
      item.ca_crt_min,
      item.ca_crt_max
    );
  });

  return (
    <>
      <Header title={"Lista de Ativos da carteira"} busca={busca} />
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
              history.goBack("/carteiras");
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
            Novo Lançamento
          </Button>
          <Button
            variant="contained"
            style={{ marginTop: 20, marginBottom: 20, marginLeft: 10 }}
            className="botao_verde_claro"
            onClick={async () => {
              const dataRows = (itens.data || []).map((item) => {
                return createData(
                  item.id,
                  item.ca_crt_codigo,
                  item.ca_aco_codigo,
                  item.ca_cri_quantidade,
                  item.ca_cri_valor_medio,
                  item.acao_id,
                  item.ca_cotacao,
                  item.ca_crt_min,
                  item.ca_crt_max
                );
              });
             
              const { data } = await API.itens.getReport(dataRows, columns);

              const caminhoPDF = data;

              abreTelaPDF(caminhoPDF);
            }}
          >
            Relatório
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
                        <TableCell align="left" style={{ textAlign: "center" }}>
                          {!row.ca_crt_min && !row.ca_crt_max ? (
                            <IconButton
                              onClick={async () => {
                                setCreate(true);
                                await fetchItemLembrete(row.id);
                                openModalLembrete();
                              }}
                            >
                              <Tooltip title="Criar Lembrete C/V">
                                <NotificationsNoneIcon />
                              </Tooltip>
                            </IconButton>
                          ) : null}
                          {row.ca_crt_max || row.ca_crt_min ?
                          (
                          <IconButton
                            onClick={async () => {
                              setCreate(false);
                              await fetchItemLembrete(row.id);
                              openModalLembrete();
                            }}
                          >
                            <Tooltip title="Editar Lembrete C/V">
                              <NotificationsActiveIcon />
                            </Tooltip>
                          </IconButton>
                          )
                        : null }

                          <IconButton
                            onClick={() => {
                              localStorage.setItem('acaoId', row.acao_id.id);
                              localStorage.setItem('tickerName', row.acao_id.ca_aco_ticker);
                              handleChangeLancamento({
                                ...lancamento,
                                acao_id: row.acao_id,
                              });
                              history.push(
                                `/lancamentos-ativos/${carteiraId}/${row.ca_aco_codigo}`,
                                { dados: row.acao_id }
                              );
                            }}
                          >
                            <Tooltip title="Lançamentos">
                              <EqualizerIcon />
                            </Tooltip>
                          </IconButton>

                          <IconButton
                            onClick={() => {
                              // handleChangeCotacao({
                              //   ...cotacao,
                              //   acao_id: row.acao_id,
                              // });
                              history.push(
                                `/cotacoes/${row.ca_aco_codigo}/${carteiraId}`,
                                { acao_id: row.acao_id }
                              );
                            }}
                          >
                            <Tooltip title="Cotações">
                              <TrendingUpIcon />
                            </Tooltip>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          ) : (
            <p className={classes.inativa}>Nenhum ativo encontrado D=</p>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 15, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage ? rowsPerPage : 5}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <EditModal carteiraId={carteiraId} edit={true} />
      <LembreteModal create={create} />
    </>
  );
};

const mapStateToProps = (state) => ({
  itens: state.itens.itens,
  item: state.itens.item,
  buscaTerm: state.itens.buscaTerm,
  lancamento: state.lancamentos.lancamento,
  status: state.itens.status,
  statusLancamento: state.lancamentos.refreshAtivos,
  token: state.auth.token,
  err: state.auth.err,
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItemLembrete: (id) => {
      dispatch(carteiraItensActions.fetchItemLembrete(id));
    },
    fetchItens: (id, term) => {
      dispatch(carteiraItensActions.fetchItens(id, term));
    },
    deleteItem: (id) => {
      dispatch(carteiraItensActions.deleteItem(id));
    },
    openModal: () => {
      dispatch(carteiraItensActions.openModal());
    },
    handleChangeLancamento: (lancamento) => {
      dispatch(lancamentosActions.handleChangeLancamento(lancamento));
    },
    handleChangeCotacao: (cotacao) => {
      dispatch(cotacoesActions.handleChangeCotacao(cotacao));
    },
    handleChangeItemTerm: (term) => {
      dispatch(carteiraItensActions.handleChangeItemTerm(term));
    },
    openModalLembrete: () => {
      dispatch(carteiraItensActions.openModalLembrete());
    },
    getReport: (rows, columns) => {
      dispatch(carteiraItensActions.getReport(rows, columns));
    },
    resetState: () => {
      dispatch(carteiraItensActions.resetState());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AtivosTable);
