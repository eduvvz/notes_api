"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _UserValidations = require('./validators/UserValidations'); var _UserValidations2 = _interopRequireDefault(_UserValidations);
var _UserRepository = require('../repository/UserRepository'); var _UserRepository2 = _interopRequireDefault(_UserRepository);
var _handleErrors = require('../utils/handleErrors');
var _handleBcript = require('../utils/handleBcript');

const UserController = {
  store: {
    validations: _UserValidations2.default.store,
    handler: async (req, res) => {
      const { name, email, password } = req.body;

      try {
        const user = await _UserRepository2.default.store({ name, email, password });
        return res.status(201).json({
          data: user,
          msg: 'Usuário criado!',
        });
      } catch (error) {
        return _handleErrors.handleDefaultError.call(void 0, error, res);
      }
    },
  },

  checkEmailExists: {
    validations: _UserValidations2.default.checkEmailExists,
    handler: async (req, res) => {
      const { email } = req.query;

      try {
        const user = await _UserRepository2.default.getByEmail(email);
        res.status(200).json({
          data: { exist: Boolean(user) },
          msg: user ? 'E-mail existe!' : 'E-mail não existe',
        });
      } catch (error) {
        return _handleErrors.handleDefaultError.call(void 0, error, res);
      }
    },
  },

  login: {
    validations: _UserValidations2.default.login,
    handler: async (req, res) => {
      const { email, password } = req.body;
      let userToResponse = {};

      try {
        const user = await _UserRepository2.default.getByEmail(email);
        const { isMatch } = await _handleBcript.compareHash.call(void 0, password, user.password);

        if (isMatch) {
          userToResponse = {
            id: user.id,
            name: user.name,
            email: user.email,
            token: _jsonwebtoken2.default.sign({ id: user.id }, process.env.SECRET, {
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
        return _handleErrors.handleDefaultError.call(void 0, error, res);
      }
    },
  },
};

exports. default = UserController;
