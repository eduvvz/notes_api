import { check } from 'express-validator';
import UserRepository from '../../repository/UserRepository';

const _checkUserExist = async (id) => {
  return new Promise((resolve, reject) => {
    UserRepository.getById(id, (user) => {
      console.log(user);
      if (user) {
        return resolve();
      }
      return reject();
    });
  });
};

export default {
  store: [
    check('userId').notEmpty().withMessage('Precisa assosciar um usuário.'),
    check('userId').custom(_checkUserExist).withMessage('Usuário não existe!'),
  ],
  getByUser: [
    check('userId').notEmpty().withMessage('O parâmetro userId é obrigatório.'),
    check('userId').custom(_checkUserExist).withMessage('Usuário não existe!'),
  ],
};
