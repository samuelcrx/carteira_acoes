import React from "react";
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
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'
import Delete from '@material-ui/icons/DeleteOutline';
import Ativos from '@material-ui/icons/Assignment';
import ContentAdd from '@material-ui/icons/Add'
import { connect } from "react-redux";
import { carteiraActions } from "../../redux/actions";

const columns = [
  { id: "name", label: "Descrição", minWidth: 135 },
  { id: "code", label: "Valor Investido", minWidth: 100 },
  {
    id: "population",
    label: "Valor Atual",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Lucro/Prejuízo",
    minWidth: 75,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
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
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 1300,
    margin: "45px auto",
    borderRadius: 8,
    backgroundColor: '#3c4858'
  },
  container: {
    maxHeight: 440,
    textAlign: "center",
    background: '#3c4858',
    borderRadius: 8
  },
  ContainedSecondary: {
    marginTop: 20,
  },
  stickyHeader: {
    background: 'red'
  },
  checkButton: {
    color: '#00ff3d !important'
  },
  newButtonIcon: {
    color: '#fff !important',
    maxWidth: 20,
    width: '100%',
    padding: 2
  }
});

const Carteira = props => {
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

  fetchCarteiras();

  // console.log('fetch all ', carteiras)

  return (
    <>
      <Header title={"Lista de carteiras de ações"} />
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Button
            variant="contained"
            style={{ marginTop: 20, marginBottom: 20 }}
            color="secondary"
          >
            Novo <ContentAdd className={classes.newButtonIcon} />
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
                <TableCell
                  // key={column.id}
                  align="left"
                  // style={{ minWidth: column.minWidth }}
                >
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
    </>
  );
}

const mapStateToProps = (state) => ({
  carteiras: state.carteira.carteiras,
  carteira: state.carteira.carteira,
  token: state.auth.token,
  err: state.auth.err,
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCarteira: id => {
      dispatch(carteiraActions.fetchCarteira(id))
    },
    fetchCarteiras: () => {
      dispatch(carteiraActions.fetchCarteiras())
    },
    deleteCarteira: id => {
      dispatch(carteiraActions.deleteCarteira(id))
    },
    // addConfirm: ({ confirmMessage, confirmFunction }) => {
    //   dispatch(confirmActions.addFunction({ confirmMessage, confirmFunction }))
    // },
    // changeMessage: ({ message }) => {
    //   dispatch(messageActions.changeMessage({ message }))
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Carteira)
