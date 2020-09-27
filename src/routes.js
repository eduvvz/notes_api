import { Router } from 'express';
import NoteController from './controllers/NoteController';
import UserController from './controllers/UserController';
import FolderController from './controllers/FolderController';
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

routes.get(
  `${prefixNote}/byUser`,
  NoteController.getByUser.validations,
  handleValidationErrors,
  NoteController.getByUser.handler
);

routes.get(
  `${prefixNote}/getByUserAndWithoutFolder`,
  NoteController.getByUserAndWithoutFolder.validations,
  handleValidationErrors,
  NoteController.getByUserAndWithoutFolder.handler
);

routes.put(
  `${prefixNote}/putInFolder`,
  NoteController.putNoteInFolder.validations,
  handleValidationErrors,
  NoteController.putNoteInFolder.handler
);

// Folder
const prefixFolder = '/folders';

routes.post(
  prefixFolder,
  FolderController.store.validations,
  handleValidationErrors,
  FolderController.store.handler
);

routes.get(
  `${prefixFolder}/byUser`,
  FolderController.getByUser.validations,
  handleValidationErrors,
  FolderController.getByUser.handler
);

export default routes;
