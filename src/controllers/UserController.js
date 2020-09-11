import { check } from 'express-validator';
import Users from '../models/Users';

const UserController = {
  store: {
    validations: [
      check('name').notEmpty().withMessage('Nome é obrigatório.'),
      check('email')
        .isEmail()
        .withMessage('E-mail não é válido.')
        .custom(async (email) => {
          return new Promise((resolve, reject) => {
            getUserByEmail(email, (user) => {
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

    handler: async (req, res) => {
      const { name, email, password } = req.body;
      try {
        const user = await Users.create({ name, email, password });
        return res.status(201).json({
          data: user,
          msg: 'Usuário criado!',
        });
      } catch (error) {
        return res.status(500).json({
          msg: 'Algo de errado aconteceu na criação do usuário.',
        });
      }
    },
  },
};

async function getUserByEmail(email, callback) {
  const user = await Users.findOne({
    where: { email },
  });
  callback(user);
  return user;
}

export default UserController;
