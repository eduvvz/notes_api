"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _expressvalidator = require('express-validator');
var _UserRepository = require('../../repository/UserRepository'); var _UserRepository2 = _interopRequireDefault(_UserRepository);

const _checkEmailExist = async (email) => {
  return new Promise((resolve, reject) => {
    _UserRepository2.default.getByEmail(email, (user) => {
      if (user) {
        return reject();
      }
      return resolve();
    });
  });
};

const _checkEmailNotExist = async (email) => {
  return new Promise((resolve, reject) => {
    _UserRepository2.default.getByEmail(email, (user) => {
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
    _expressvalidator.check.call(void 0, 'email').normalizeEmail().isEmail().withMessage('E-mail inválido!'),
    _expressvalidator.check.call(void 0, 'email').custom(_checkEmailExist).withMessage('E-mail já em uso!'),
    _expressvalidator.check.call(void 0, 'password').notEmpty().withMessage('Senha é obrigatória.'),
    _expressvalidator.check.call(void 0, 'confirmPassword')
      .custom((confirmPassword, { req }) => {
        const { password } = req.body;
        return password === confirmPassword;
      })
      .withMessage('As senhas devem ser iguais.'),
  ],
  checkEmailExists: [
    _expressvalidator.check.call(void 0, 'email').notEmpty().withMessage('O parâmetro e-mail é obrigatório.'),
  ],
  login: [
    _expressvalidator.check.call(void 0, 'email').notEmpty().withMessage('E-mail é obrigatório.'),
    _expressvalidator.check.call(void 0, 'password').notEmpty().withMessage('Senha é obrigatória.'),
    _expressvalidator.check.call(void 0, 'email')
      .custom(_checkEmailNotExist)
      .withMessage('E-mail não existe!'),
  ],
};
