"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Folder = require('../models/Folder'); var _Folder2 = _interopRequireDefault(_Folder);

class FolderRepository {
  async store(folder) {
    return new Promise((resolve, reject) => {
      _Folder2.default.create(folder)
        .then((folder) => {
          resolve(folder);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getById(id, callback) {
    return new Promise((resolve, reject) => {
      _Folder2.default.findByPk(id)
        .then((folder) => {
          callback(callback);
          resolve(folder);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getByUser(userId) {
    return new Promise((resolve, reject) => {
      _Folder2.default.findAndCountAll({
        where: { userId },
        order: [['updatedAt', 'DESC']],
      })
        .then((folders) => {
          resolve(folders);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

exports. default = new FolderRepository();
