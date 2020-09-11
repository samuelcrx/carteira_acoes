import "dotenv/config";
import express from "express";
import routes from "./routes";

import "./database";

const Email = require('./utils/email');
const config = require('./config/email')

class App {
  constructor() {
    this.server = express();

    this.server.email = new Email(config)

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;