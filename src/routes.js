import { Router } from 'express';
import UserController from './controllers/UserController';
import { handleValidationErrors } from './utils/handleErrors';
const routes = Router();

routes.get('/', (_, res) => {
  return res.send('NOTES API');
});

// Users
routes.post(
  '/users',
  UserController.store.validations,
  handleValidationErrors,
  UserController.store.handler
);

export default routes;
