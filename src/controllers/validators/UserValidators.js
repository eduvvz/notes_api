import { check } from 'express-validator';
import UserRepository from '../../repository/UserRepository';

export default {
  store: [
    check('name').notEmpty().withMessage('Nome é obrigatório.'),
    check('email').normalizeEmail().isEmail().withMessage('E-mail inválido!'),
    check('email')
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
};
