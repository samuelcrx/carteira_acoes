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
import apiAcoes from '../../api/apiAcoes';
import { json } from "body-parser";

const columns = [
  { id: "ca_aco_ticker", label: "Ticker", minWidth: 100 },
  // { id: "data", label: "Data", minWidth: 100 },
  // { id: "ca_acc_valor", label: "Valor", minWidth: 100 },

  { 
    id: "data", 
    label: "Data", 
    minWidth: 100,
    //format: (value) => value.toLocaleString("pt-BR"),
    //format: (value) => Intl.DateTimeFormat("pt-BR").format(value),
    format: (value) => new Intl.DateTimeFormat('pt-br').format(new Date(value), ),
   },
  { 
    id: "ca_acc_valor", 
    label: "Valor", 
    minWidth: 100, 
    align: "left",
    format: (value) => "R$ " + value.toLocaleString("pt-BR", {minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  },    
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
  btnVoltar: {
    color: "#fff",
  },
});

const Cotacao = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
    restartTable,
    addCotacao
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
      <Header title={"Lista das cotações de ações"} search={true}/>
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
            className="botao_verde_claro"
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

          <Button
            variant="contained"
            style={{ margin: 10 }}
            className="botao_verde_claro"
            onClick={async () => {
              
              // Primeira forma   
                // API HG Brasil
                // const response = await apiAcoes.get(acao_id.ca_aco_ticker);

                // API Via CEP
                const response = await apiAcoes.get('13870377/json/');    
                console.log(response.data.logradouro);

                // API GITHUB
                // const response = await apiAcoes.get('rtorru');    
                // console.log(response.data.id);
              // Primeira forma

              // Segunda Forma
                // const request = require('request');
                // request('https://api.hgbrasil.com/finance/stock_price?key=02100a87&symbol=itsa4', { json: true }, (err, res, body) => {
                //   if (err) { return console.log(err); }
                //   console.log(body.length);
                //   console.log(res.id);
                // });
                // console.log(request);
              // Segunda Forma
            
              // ###########################################################################
              // Insere a resposta da cotação no banco
                // console.log(cotacao);
                // const valorCotacao  = 32;
                // cotacao.ca_usu_codigo = user.id
                // cotacao.acao_id       = acao_id
                // cotacao.ca_acc_valor  = parseFloat(valorCotacao) || 0

                // // console.log(cotacao);
                // try {
                //   await addCotacao(cotacao, user.id);
                //   resetState();
                // } catch (error) {
                //   alert(error);
                // }
                // console.log(cotacao);
              // Insere a resposta da cotação no banco
              // ###########################################################################

            }}
          >
            Busca Automática
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
          rowsPerPageOptions={[5, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <EditModal userId={user.id} acoCodigo={acoCodigo} carteiraId={carteiraId}/>
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
    addCotacao: (cotacao, ca_usu_codigo, carteiraId) => {
      dispatch(cotacoesActions.addCotacao(cotacao, ca_usu_codigo, carteiraId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cotacao);
