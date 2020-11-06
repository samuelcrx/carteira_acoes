import React from "react";
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper";
import Header from "../Menu/menu"
import {Line} from 'react-chartjs-2'

const columns = [
  { id: "index", label: "", minWidth: 20 },
  { id: "ticker", label: "Ticker", minWidth: 100 },
  { id: "empresa", label: "Empresa", minWidth: 100 },
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

const Chart = (props) => {
  const classes = useStyles();

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Nome carteira/acao',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  }

  return (
    <>
      <Header title={"Gráfico de evolução"} />
      <Paper className={classes.root}>
        <Line data={data}/>
      </Paper>
    </>
  );
};

export default Chart;
