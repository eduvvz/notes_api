import { Router } from 'express';
import UserController from './controllers/UserController';
import { handleValidationErrors } from './utils/handleErrors';
const routes = Router();

routes.get('/', (_, res) => {
  return res.send('NOTES API');
});

// Users
const preffixUser = '/users';

routes.post(
  preffixUser,
  UserController.store.validations,
  handleValidationErrors,
  UserController.store.handler
);

routes.get(
  `${preffixUser}/checkEmailExists`,
  UserController.checkEmailExists.validations,
  handleValidationErrors,
  UserController.checkEmailExists.hendler
);

export default routes;
