"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _expresspaginate = require('express-paginate'); var _expresspaginate2 = _interopRequireDefault(_expresspaginate);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);

class App {
  constructor() {
    this.server = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  routes() {
    this.server.use(_routes2.default);
  }

  middlewares() {
    this.server.use(_expresspaginate2.default.middleware(10, 50));
    this.server.use(_cors2.default.call(void 0, ));
    this.server.use(_express2.default.json());
  }
}

exports. default = new App().server;
