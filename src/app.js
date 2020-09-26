import express from 'express';
import paginate from 'express-paginate';
import routes from './routes';
import cors from 'cors';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.server.use(routes);
  }

  middlewares() {
    this.server.use(paginate.middleware(10, 50));
    this.server.use(cors());
    this.server.use(express.json());
  }
}

export default new App().server;
