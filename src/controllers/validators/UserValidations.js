import { check } from 'express-validator';
import UserRepository from '../../repository/UserRepository';

const _checkEmailExist = async (email) => {
  return new Promise((resolve, reject) => {
    UserRepository.getByEmail(email, (user) => {
      if (user) {
        return reject();
      }
      return resolve();
    });
  });
};

const _checkEmailNotExist = async (email) => {
  return new Promise((resolve, reject) => {
    UserRepository.getByEmail(email, (user) => {
      if (user) {
        return resolve();
      }
      return reject();
    });
  });
};

export default {
  store: [
    check('name').notEmpty().withMessage('Nome é obrigatório.'),
    check('email').normalizeEmail().isEmail().withMessage('E-mail inválido!'),
    check('email').custom(_checkEmailExist).withMessage('E-mail já em uso!'),
    check('password').notEmpty().withMessage('Senha é obrigatória.'),
    check('confirmPassword')
      .custom((confirmPassword, { req }) => {
        const { password } = req.body;
        return password === confirmPassword;
      })
      .withMessage('As senhas devem ser iguais.'),
  ],
  checkEmailExists: [
    check('email').notEmpty().withMessage('O parâmetro e-mail é obrigatório.'),
  ],
  login: [
    check('email').notEmpty().withMessage('E-mail é obrigatório.'),
    check('password').notEmpty().withMessage('Senha é obrigatória.'),
    check('email')
      .custom(_checkEmailNotExist)
      .withMessage('E-mail não existe!'),
  ],
};
