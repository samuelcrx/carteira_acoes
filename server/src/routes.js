const express = require('express');
import authMiddleware from "./middlewares/auth";

const UserController = require('./controllers/UserController');
const CarteiraController = require('./controllers/CarteirasController');
const AcaoController = require('./controllers/AcaoController');
const AcaoCotacaoController = require('./controllers/AcaoCotacaoController');
const CarteiraItensController = require('./controllers/CarteiraItensController');
const CarteiraMovimentoController = require('./controllers/CarteiraMovimentoController');
const recoveryPassword = require('./controllers/recoveryPasswordController');


const routes = express.Router();

routes.post("/auth", UserController.login);
routes.post('/users', UserController.store);
routes.put('/recuperacaoSenha', recoveryPassword.recovery);


// Login
routes.use("/", authMiddleware);

// Rotas do usuario
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.put('/updatePassword/:id', UserController.updatePassword);
routes.delete('/users/:id', UserController.delete);

// Rotas de carteiras
routes.get('/carteiras', CarteiraController.index);
routes.post('/carteiras/:ca_usu_codigo', CarteiraController.store);
routes.get('/carteiras/:id', CarteiraController.show);
routes.put('/carteiras/:id', CarteiraController.update);
routes.delete('/carteiras/:id', CarteiraController.delete);

// Rotas de acoes
routes.get('/acoes', AcaoController.index);
routes.post('/acoes', AcaoController.store);
routes.get('/acoes/:id', AcaoController.show);
routes.put('/acoes/:id', AcaoController.update);
routes.delete('/acoes/:id', AcaoController.delete);


// Rotas de acoes cotações
routes.get('/cotacoes', AcaoCotacaoController.index);
routes.post('/cotacoes', AcaoCotacaoController.store);
routes.get('/cotacoes/:id', AcaoCotacaoController.show);
routes.put('/cotacoes/:id', AcaoCotacaoController.update);
routes.delete('/cotacoes/:id', AcaoCotacaoController.delete);


// Rotas de carteira itens
routes.get('/itens', CarteiraItensController.index);
routes.post('/itens', CarteiraItensController.store);
routes.get('/itens/:id', CarteiraItensController.show);
routes.put('/itens/:id', CarteiraItensController.update);
routes.put('/itensvalor/:id', CarteiraItensController.updateValor);
routes.delete('/itens/:id', CarteiraItensController.delete);


// Rotas de carteira movimentação
routes.get('/movimentacao', CarteiraMovimentoController.index);
routes.post('/movimentacao', CarteiraMovimentoController.store);
routes.get('/movimentacao/:id', CarteiraMovimentoController.show);
routes.put('/movimentacao/:id', CarteiraMovimentoController.update);
routes.delete('/movimentacao/:id', CarteiraMovimentoController.delete);


module.exports = routes;