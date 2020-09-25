import { Router } from 'express';
import NoteController from './controllers/NoteController';
import UserController from './controllers/UserController';
import { handleValidationErrors } from './utils/handleErrors';
const routes = Router();

routes.get('/', (_, res) => {
  return res.send('NOTES API');
});

// Users
const prefixUser = '/users';

routes.post(
  prefixUser,
  UserController.store.validations,
  handleValidationErrors,
  UserController.store.handler
);

routes.get(
  `${prefixUser}/checkEmailExists`,
  UserController.checkEmailExists.validations,
  handleValidationErrors,
  UserController.checkEmailExists.handler
);

routes.post(
  `${prefixUser}/login`,
  UserController.login.validations,
  handleValidationErrors,
  UserController.login.handler
);

// Notes
const prefixNote = '/notes';

routes.post(
  prefixNote,
  NoteController.store.validations,
  handleValidationErrors,
  NoteController.store.handler
);

export default routes;
