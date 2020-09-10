import { Router } from 'express';
const routes = Router();

routes.get('/', (_, res) => {
  return res.send('NOTES API');
});

export default routes;
