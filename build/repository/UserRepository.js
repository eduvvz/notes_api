"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Users = require('../models/Users'); var _Users2 = _interopRequireDefault(_Users);

class UserRepository {
  async store(user) {
    return new Promise((resolve, reject) => {
      _Users2.default.create(user)
        .then((newUser) => {
          resolve(newUser);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getByEmail(email, callback = () => null) {
    return new Promise((resolve, reject) => {
      _Users2.default.findOne({
        where: { email },
      })
        .then((user) => {
          callback(user);
          resolve(user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getById(id, callback) {
    return new Promise((resolve, reject) => {
      _Users2.default.findByPk(id)
        .then((user) => {
          callback(user);
          resolve(user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

exports. default = new UserRepository();
