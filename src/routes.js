import { Router } from 'express';
import UserController from './controllers/UserController';
const routes = Router();

routes.get('/', (_, res) => {
  return res.send('NOTES API');
});

// Users
routes.post('/users', UserController.store);

export default routes;
