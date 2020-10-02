"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _NoteController = require('./controllers/NoteController'); var _NoteController2 = _interopRequireDefault(_NoteController);
var _UserController = require('./controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _FolderController = require('./controllers/FolderController'); var _FolderController2 = _interopRequireDefault(_FolderController);
var _handleErrors = require('./utils/handleErrors');
var _verifyJWT = require('./utils/verifyJWT'); var _verifyJWT2 = _interopRequireDefault(_verifyJWT);
const routes = _express.Router.call(void 0, );

routes.get('/', (_, res) => {
  return res.send('NOTES API');
});

// Users
const prefixUser = '/users';

routes.post(
  prefixUser,
  _UserController2.default.store.validations,
  _handleErrors.handleValidationErrors,
  _UserController2.default.store.handler
);

routes.get(
  `${prefixUser}/checkEmailExists`,
  _UserController2.default.checkEmailExists.validations,
  _handleErrors.handleValidationErrors,
  _UserController2.default.checkEmailExists.handler
);

routes.post(
  `${prefixUser}/login`,
  _UserController2.default.login.validations,
  _handleErrors.handleValidationErrors,
  _UserController2.default.login.handler
);

// Notes
const prefixNote = '/notes';

routes.post(
  prefixNote,
  _verifyJWT2.default,
  _NoteController2.default.store.validations,
  _handleErrors.handleValidationErrors,
  _NoteController2.default.store.handler
);

routes.get(
  `${prefixNote}/byUser`,
  _verifyJWT2.default,
  _NoteController2.default.getByUser.validations,
  _handleErrors.handleValidationErrors,
  _NoteController2.default.getByUser.handler
);

routes.get(
  `${prefixNote}/getByUserAndWithoutFolder`,
  _verifyJWT2.default,
  _NoteController2.default.getByUserAndWithoutFolder.validations,
  _handleErrors.handleValidationErrors,
  _NoteController2.default.getByUserAndWithoutFolder.handler
);

routes.put(
  `${prefixNote}/putInFolder`,
  _verifyJWT2.default,
  _NoteController2.default.putNoteInFolder.validations,
  _handleErrors.handleValidationErrors,
  _NoteController2.default.putNoteInFolder.handler
);

routes.get(
  `${prefixNote}/getInFolder`,
  _verifyJWT2.default,
  _NoteController2.default.getNotesInFolder.validations,
  _handleErrors.handleValidationErrors,
  _NoteController2.default.getNotesInFolder.handler
);

routes.delete(
  prefixNote,
  _verifyJWT2.default,
  _NoteController2.default.delete.validations,
  _handleErrors.handleValidationErrors,
  _NoteController2.default.delete.handler
);

routes.put(
  `${prefixNote}/restore`,
  _verifyJWT2.default,
  _NoteController2.default.restore.validations,
  _handleErrors.handleValidationErrors,
  _NoteController2.default.restore.handler
);

routes.delete(
  `${prefixNote}/permanently`,
  _verifyJWT2.default,
  _NoteController2.default.deletePermanently.validations,
  _handleErrors.handleValidationErrors,
  _NoteController2.default.deletePermanently.handler
);

routes.get(
  `${prefixNote}/getDeleted`,
  _verifyJWT2.default,
  _NoteController2.default.getDeleted.validations,
  _handleErrors.handleValidationErrors,
  _NoteController2.default.getDeleted.handler
);

// Folder
const prefixFolder = '/folders';

routes.post(
  prefixFolder,
  _verifyJWT2.default,
  _FolderController2.default.store.validations,
  _handleErrors.handleValidationErrors,
  _FolderController2.default.store.handler
);

routes.get(
  `${prefixFolder}/byUser`,
  _verifyJWT2.default,
  _FolderController2.default.getByUser.validations,
  _handleErrors.handleValidationErrors,
  _FolderController2.default.getByUser.handler
);

exports. default = routes;
