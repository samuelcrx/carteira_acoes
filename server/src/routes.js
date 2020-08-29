const express = require('express');

const UserController = require('./controllers/UserController');
const LogController = require('./controllers/LogController');


const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.delete('/users/:id', UserController.delete);

routes.post('/logs/:userId', LogController.store);

module.exports = routes;