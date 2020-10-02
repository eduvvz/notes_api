"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _expressvalidator = require('express-validator');
var _UserRepository = require('../../repository/UserRepository'); var _UserRepository2 = _interopRequireDefault(_UserRepository);

const _checkUserExist = async (id) => {
  return new Promise((resolve, reject) => {
    _UserRepository2.default.getById(id, (user) => {
      console.log(user);
      if (user) {
        return resolve();
      }
      return reject();
    });
  });
};

exports. default = {
  store: [
    _expressvalidator.check.call(void 0, 'name').notEmpty().withMessage('Nome é obrigatório.'),
    _expressvalidator.check.call(void 0, 'userId').notEmpty().withMessage('Precisa assosciar um usuário.'),
    _expressvalidator.check.call(void 0, 'userId').custom(_checkUserExist).withMessage('Usuário não existe!'),
  ],
  getByUser: [
    _expressvalidator.check.call(void 0, 'userId').notEmpty().withMessage('O parâmetro userId é obrigatório.'),
    _expressvalidator.check.call(void 0, 'userId').custom(_checkUserExist).withMessage('Usuário não existe!'),
  ],
};
