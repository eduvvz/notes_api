"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _expressvalidator = require('express-validator');
var _FolderRepository = require('../../repository/FolderRepository'); var _FolderRepository2 = _interopRequireDefault(_FolderRepository);
var _NoteRepository = require('../../repository/NoteRepository'); var _NoteRepository2 = _interopRequireDefault(_NoteRepository);
var _UserRepository = require('../../repository/UserRepository'); var _UserRepository2 = _interopRequireDefault(_UserRepository);

const _checkUserExist = async (id) => {
  return new Promise((resolve, reject) => {
    _UserRepository2.default.getById(id, (user) => {
      if (user) {
        return resolve();
      }
      return reject();
    });
  });
};

const _checkNoteExist = async (id) => {
  return new Promise((resolve, reject) => {
    _NoteRepository2.default.getById(id, (note) => {
      if (note) {
        return resolve();
      }
      return reject();
    });
  });
};

const _checkFolderExist = async (id) => {
  return new Promise((resolve, reject) => {
    _FolderRepository2.default.getById(id, (folder) => {
      if (folder) {
        return resolve();
      }
      return reject();
    });
  });
};

exports. default = {
  store: [
    _expressvalidator.check.call(void 0, 'userId').notEmpty().withMessage('Precisa assosciar um usuário.'),
    _expressvalidator.check.call(void 0, 'userId').custom(_checkUserExist).withMessage('Usuário não existe!'),
  ],
  getByUser: [
    _expressvalidator.check.call(void 0, 'userId').notEmpty().withMessage('O parâmetro userId é obrigatório.'),
    _expressvalidator.check.call(void 0, 'userId').custom(_checkUserExist).withMessage('Usuário não existe!'),
  ],
  getByUserAndWithoutFolder: [
    _expressvalidator.check.call(void 0, 'userId').notEmpty().withMessage('O parâmetro userId é obrigatório.'),
    _expressvalidator.check.call(void 0, 'userId').custom(_checkUserExist).withMessage('Usuário não existe!'),
  ],
  putNoteInFolder: [
    _expressvalidator.check.call(void 0, 'noteId').notEmpty().withMessage('O parâmetro noteId é obrigatório.'),
    _expressvalidator.check.call(void 0, 'noteId').custom(_checkNoteExist).withMessage('A nota não existe!'),
    _expressvalidator.check.call(void 0, 'folderId')
      .notEmpty()
      .withMessage('O parâmetro folderId é obrigatório.'),
    _expressvalidator.check.call(void 0, 'folderId')
      .custom(_checkFolderExist)
      .withMessage('A pasta não existe!'),
  ],
  getNotesInFolder: [
    _expressvalidator.check.call(void 0, 'folderId')
      .notEmpty()
      .withMessage('O parâmetro folderId é obrigatório.'),
    _expressvalidator.check.call(void 0, 'folderId')
      .custom(_checkFolderExist)
      .withMessage('A pasta não existe!'),
  ],
  delete: [
    _expressvalidator.check.call(void 0, 'noteId').notEmpty().withMessage('O parâmetro noteId é obrigatório.'),
    _expressvalidator.check.call(void 0, 'noteId').custom(_checkNoteExist).withMessage('A nota não existe!'),
  ],
  restore: [
    _expressvalidator.check.call(void 0, 'noteId').notEmpty().withMessage('O parâmetro noteId é obrigatório.'),
    _expressvalidator.check.call(void 0, 'noteId').custom(_checkNoteExist).withMessage('A nota não existe!'),
  ],
  getDeleted: [
    _expressvalidator.check.call(void 0, 'userId').notEmpty().withMessage('Precisa assosciar um usuário.'),
    _expressvalidator.check.call(void 0, 'userId').custom(_checkUserExist).withMessage('Usuário não existe!'),
  ],
};
