import jwt from 'jsonwebtoken';
import UserValidator from './validators/UserValidators';
import UserRepository from '../repository/UserRepository';
import { handleDefaultError } from '../utils/handleErrors';
import { compareHash } from '../utils/handleBcript';

const UserController = {
  store: {
    validations: UserValidator.store,
    handler: async (req, res) => {
      const { name, email, password } = req.body;

      try {
        const user = await UserRepository.store({ name, email, password });
        return res.status(201).json({
          data: user,
          msg: 'Usuário criado!',
        });
      } catch (error) {
        return handleDefaultError(error, res);
      }
    },
  },

  checkEmailExists: {
    validations: UserValidator.checkEmailExists,
    handler: async (req, res) => {
      const { email } = req.query;

      try {
        const user = await UserRepository.getByEmail(email);
        res.status(200).json({
          data: { exist: Boolean(user) },
          msg: user ? 'E-mail existe!' : 'E-mail não existe',
        });
      } catch (error) {
        return handleDefaultError(error, res);
      }
    },
  },

  login: {
    validations: UserValidator.login,
    handler: async (req, res) => {
      const { email, password } = req.body;
      let userToResponse = {};

      try {
        const user = await UserRepository.getByEmail(email);
        const { isMatch } = await compareHash(password, user.password);

        if (isMatch) {
          userToResponse = {
            id: user.id,
            name: user.name,
            email: user.email,
            token: jwt.sign({ id: user.id }, process.env.SECRET, {
              expiresIn: '5d',
            }),
          };
        }

        return res.status(isMatch ? 200 : 422).json({
          [isMatch ? 'data' : 'errors']: isMatch
            ? { user: userToResponse }
            : [{ param: 'password', msg: 'A senha não está certa.' }],
          msg: isMatch ? 'O login foi feito!' : 'O login não foi feito.',
        });
      } catch (error) {
        return handleDefaultError(error, res);
      }
    },
  },
};

export default UserController;
