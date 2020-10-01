import { Router } from 'express';
import NoteController from './controllers/NoteController';
import UserController from './controllers/UserController';
import FolderController from './controllers/FolderController';
import { handleValidationErrors } from './utils/handleErrors';
import verifyJWT from './utils/verifyJWT';
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
  verifyJWT,
  NoteController.store.validations,
  handleValidationErrors,
  NoteController.store.handler
);

routes.get(
  `${prefixNote}/byUser`,
  verifyJWT,
  NoteController.getByUser.validations,
  handleValidationErrors,
  NoteController.getByUser.handler
);

routes.get(
  `${prefixNote}/getByUserAndWithoutFolder`,
  verifyJWT,
  NoteController.getByUserAndWithoutFolder.validations,
  handleValidationErrors,
  NoteController.getByUserAndWithoutFolder.handler
);

routes.put(
  `${prefixNote}/putInFolder`,
  verifyJWT,
  NoteController.putNoteInFolder.validations,
  handleValidationErrors,
  NoteController.putNoteInFolder.handler
);

routes.get(
  `${prefixNote}/getInFolder`,
  verifyJWT,
  NoteController.getNotesInFolder.validations,
  handleValidationErrors,
  NoteController.getNotesInFolder.handler
);

routes.delete(
  prefixNote,
  verifyJWT,
  NoteController.delete.validations,
  handleValidationErrors,
  NoteController.delete.handler
);

routes.put(
  `${prefixNote}/restore`,
  verifyJWT,
  NoteController.restore.validations,
  handleValidationErrors,
  NoteController.restore.handler
);

routes.delete(
  `${prefixNote}/permanently`,
  verifyJWT,
  NoteController.deletePermanently.validations,
  handleValidationErrors,
  NoteController.deletePermanently.handler
);

routes.get(
  `${prefixNote}/getDeleted`,
  verifyJWT,
  NoteController.getDeleted.validations,
  handleValidationErrors,
  NoteController.getDeleted.handler
);

// Folder
const prefixFolder = '/folders';

routes.post(
  prefixFolder,
  verifyJWT,
  FolderController.store.validations,
  handleValidationErrors,
  FolderController.store.handler
);

routes.get(
  `${prefixFolder}/byUser`,
  verifyJWT,
  FolderController.getByUser.validations,
  handleValidationErrors,
  FolderController.getByUser.handler
);

export default routes;
