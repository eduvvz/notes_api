import { validatorUser } from '../utils/validatorControllers';
import UserRepository from '../repository/UserRepository';

const UserController = {
  store: {
    validations: validatorUser.store,
    handler: UserRepository.store,
  },
};

export default UserController;
