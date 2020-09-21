import UserValidator from './validators/UserValidators';
import UserRepository from '../repository/UserRepository';

const UserController = {
  store: {
    validations: UserValidator.store,
    handler: UserRepository.store,
  },

  checkEmailExists: {
    validations: UserValidator.checkEmailExists,
    hendler: UserRepository.checkEmailExists,
  },

  login: {
    validations: UserValidator.login,
    handler: UserRepository.login,
  },
};

export default UserController;
