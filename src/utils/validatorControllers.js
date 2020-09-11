import { check } from 'express-validator';
import UserRepository from '../repository/UserRepository';

export const validatorUser = {
  store: [
    check('name').notEmpty().withMessage('Nome é obrigatório.'),
    check('email')
      .isEmail()
      .withMessage('E-mail não é válido.')
      .custom(async (email) => {
        return new Promise((resolve, reject) => {
          UserRepository.getByEmail(email, (user) => {
            if (user) {
              return reject();
            }
            return resolve();
          });
        });
      })
      .withMessage('E-mail já em uso!'),
    check('password').notEmpty().withMessage('Senha é obrigatória.'),
  ],
};
