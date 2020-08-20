const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv/config')

const indexRouter = require('./routes/index');

const app = express();
const port = process.env.PORT

app.set('port', port);

app.use(bodyParser.json({
  limit: '5mb'
}));

indexRouter(app);

module.exports = app;
