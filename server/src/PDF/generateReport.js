
const format = (value) => {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatEvolucao = (value) => {
  return (
    value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "%"
  );
};

const generateReport = function (rows, archiveName) {
  console.log("AQQQQ ", typeof rows);
  var options = { orientation: "landscape" };
  var nome = "Rodrigo";
  // var conteudo = `
  //                       <h1 style='color: red'> Teste <h1>
  //                       <hr>
  //                       <p> Outro teste </p>
  //                       <p> Nome: ${nome} </p>
  //   `;

  var conteudo = `
    <html lang="pt-br">
        <head>
            <meta charset="utf-8">
    
            <style type="text/css">
                body{
                    font-family: sans-serif, arial;
                }
                p{
                    padding:            0px 0px 5px 20px;
                }
                .cabecalho{
                    height:             80px;
                    padding:            20px 10px 10px 20px;
                    background-color:   #272727;                    
                    color:              #FFF;                    
                }
                .fonteTitulo{
                    font-weight:        bold;
                    font-size:          24px;
                    text-align:center ! important;
                }
                .rodape{
                    height:             80px;
                    padding:            20px 10px 10px 20px;
                    background-color:   #272727;                    
                    color:              #FFF;                    
                }
                .mensagem{
                    margin: 0px;
                    background-color:   #E7E9DA;
                    border:             1px solid #d7d7d7
                }
                .tabelaTitulo {               
                    color:          #FFFFFF;
                    font-weight:    bold; 
                    font-size:      12px; 
                    padding:        20px 30px 20px 30px;
                }
                .tabelaLinha { 
                    color:          #272727;
                    font-weight:    bold; 
                    font-size:      10px; 
                    padding:        10px 15px 10px 10px;  
                }
    
            </style>
        </head>
    
        <body>
            <div class="cabecalho">	
    
                <p class="fonteTitulo">Lista de ações da carteira</p>
    
            </div>
    
            <div class="mensagem">	
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td>
                            <table align="center" border="1" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse" >
                                <tr bgcolor="#272727"; align="center";bordercolor="#E7E9DA">
                                    <td class="tabelaTitulo">Ticker</td>
                                    <td class="tabelaTitulo">Empresa</td>
                                    <td class="tabelaTitulo">Quantidade</td>
                                    <td class="tabelaTitulo">Valor Médio</td>
                                    <td class="tabelaTitulo">Valor Investido</td>
                                    <td class="tabelaTitulo">Valor Atual</td>
                                    <td class="tabelaTitulo">Lucro / Prejuízo</td>
                                    <td class="tabelaTitulo">Evolução</td>
                                </tr>`;

  for (const row of rows) {
    let aux = JSON.parse(row);

    conteudo =
      conteudo +
      `<tr bgcolor="#E7E9DA"; align="center";bordercolor="#272727">
                                      <td class="tabelaLinha" align="left">${
                                        aux.ticker
                                      }</td>
                                      <td class="tabelaLinha" align="left">${
                                        aux.empresa
                                      }</td>
                                      <td class="tabelaLinha" align="left">${aux.ca_cri_quantidade.toLocaleString(
                                        "pt-BR"
                                      )}</td>
                                      <td class="tabelaLinha" align="left">R$ ${format(
                                        aux.ca_cri_valor_medio
                                      )}</td>
                                      <td class="tabelaLinha" align="left">R$ ${format(
                                        aux.valor_investido
                                      )}</td>
                                      <td class="tabelaLinha" align="left">R$ ${format(
                                        aux.valor_atual
                                      )}</td>
                                      <td class="tabelaLinha" align="left">R$ ${format(
                                        aux.lucro_prejuizo
                                      )}</td>
                                      <td class="tabelaLinha" align="left">${formatEvolucao(
                                        aux.evolucao
                                      )}</td>
                                    </tr>`;
  }

  conteudo =
    conteudo +
    `   
                                <tr bgcolor="#272727"; align="center";bordercolor="#E7E9DA">
                                    <td class="tabelaTitulo" colspan="8"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
    
            <div class="rodape">
                <a> </a> 	<br>
            </div>				 
        </body>
    </html>
    `;

    return { conteudo, options };
  
};

module.exports = generateReport;
