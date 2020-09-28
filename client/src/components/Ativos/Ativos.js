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
import { carteiraActions } from "../../redux/actions";
import EditModal from "./EditModal";

const columns = [
  { id: "code", label: "Ticker", minWidth: 60 },
  { id: "name", label: "Empresa", minWidth: 135 },
  {
    id: "population",
    label: "Quantidade",
    minWidth: 45,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Valor Médio",
    minWidth: 75,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Valor Investido",
    minWidth: 60,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Valor Atual",
    minWidth: 60,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Lucro/Prejuízo",
    minWidth: 60,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Evolução",
    minWidth: 60,
    align: "left",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 200, 11.8),
  createData("China", "CN", 200, 9.87),
  createData("Italy", "IT", 100, 5.98),
  createData("United States", "US", 300, 10.35),
  createData("Canada", "CA", 80, 14.0),
  createData("Australia", "AU", 20, 20.14),
  createData("Germany", "DE", 45, 12.45),
  createData("India", "IN", 200, 11.8),
  createData("China", "CN", 200, 9.87),
  createData("Italy", "IT", 100, 5.98),
  createData("United States", "US", 300, 10.35),
  createData("Canada", "CA", 80, 14.0),
  createData("Australia", "AU", 20, 20.14),
  createData("Germany", "DE", 45, 12.45),
  createData("India", "IN", 200, 11.8),
  createData("China", "CN", 200, 9.87),
  createData("Italy", "IT", 100, 5.98),
  createData("United States", "US", 300, 10.35),
  createData("Canada", "CA", 80, 14.0),
  createData("Australia", "AU", 20, 20.14),
  createData("Germany", "DE", 45, 12.45),
  createData("India", "IN", 200, 11.8),
  createData("China", "CN", 200, 9.87),
  createData("Italy", "IT", 100, 5.98),
  createData("United States", "US", 300, 10.35),
  createData("Canada", "CA", 80, 14.0),
  createData("Australia", "AU", 20, 20.14),
  createData("Germany", "DE", 45, 12.45),
];

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
});

const AtivosTable = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { fetchCarteiras, carteiras } = props;

  useEffect(() => {
    // fetchCarteiras();
  }, []);

  console.log("fetch all ", carteiras);

  return (
    <>
      <Header title={"Lista de Ativos da carteira"} />
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Button
            variant="contained"
            style={{ marginTop: 20, marginBottom: 20 }}
            color="secondary"
            onClick={() => {}}
          >
            Novo Lançamento
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
                  align="left"
                  // style={{ minWidth: column.minWidth }}
                >
                  {"Lançamentos"}
                </TableCell>
                <TableCell
                  align="left"
                  // style={{ minWidth: column.minWidth }}
                >
                  {"Cotações"}
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
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell align="left">
                        <CheckIcon className={classes.checkButton} />
                      </TableCell>
                      <TableCell align="left">
                        <IconButton>
                          <Tooltip title="Ativos">
                            <Ativos />
                          </Tooltip>
                        </IconButton>

                        <IconButton>
                          <Tooltip title="Editar">
                            <EditIcon />
                          </Tooltip>
                        </IconButton>

                        <IconButton>
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
          rowsPerPageOptions={[5, 15, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage ? rowsPerPage : 5}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <EditModal />
    </>
  );
};

const mapStateToProps = (state) => ({
  carteiras: state.carteira.carteiras,
  carteira: state.carteira.carteira,
  modalOpen: state.carteira.modalOpen,
  token: state.auth.token,
  err: state.auth.err,
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCarteira: (id) => {
      dispatch(carteiraActions.fetchCarteira(id));
    },
    fetchCarteiras: () => {
      dispatch(carteiraActions.fetchCarteiras());
    },
    deleteCarteira: (id) => {
      dispatch(carteiraActions.deleteCarteira(id));
    },
    openModal: () => {
      dispatch(carteiraActions.openModal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AtivosTable);
