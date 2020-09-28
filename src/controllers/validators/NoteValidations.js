import { check } from 'express-validator';
import FolderRepository from '../../repository/FolderRepository';
import NoteRepository from '../../repository/NoteRepository';
import UserRepository from '../../repository/UserRepository';

const _checkUserExist = async (id) => {
  return new Promise((resolve, reject) => {
    UserRepository.getById(id, (user) => {
      if (user) {
        return resolve();
      }
      return reject();
    });
  });
};

const _checkNoteExist = async (id) => {
  return new Promise((resolve, reject) => {
    NoteRepository.getById(id, (note) => {
      if (note) {
        return resolve();
      }
      return reject();
    });
  });
};

const _checkFolderExist = async (id) => {
  return new Promise((resolve, reject) => {
    FolderRepository.getById(id, (folder) => {
      if (folder) {
        return resolve();
      }
      return reject();
    });
  });
};

export default {
  store: [
    check('userId').notEmpty().withMessage('Precisa assosciar um usuário.'),
    check('userId').custom(_checkUserExist).withMessage('Usuário não existe!'),
  ],
  getByUser: [
    check('userId').notEmpty().withMessage('O parâmetro userId é obrigatório.'),
    check('userId').custom(_checkUserExist).withMessage('Usuário não existe!'),
  ],
  getByUserAndWithoutFolder: [
    check('userId').notEmpty().withMessage('O parâmetro userId é obrigatório.'),
    check('userId').custom(_checkUserExist).withMessage('Usuário não existe!'),
  ],
  putNoteInFolder: [
    check('noteId').notEmpty().withMessage('O parâmetro noteId é obrigatório.'),
    check('noteId').custom(_checkNoteExist).withMessage('A nota não existe!'),
    check('folderId')
      .notEmpty()
      .withMessage('O parâmetro folderId é obrigatório.'),
    check('folderId')
      .custom(_checkFolderExist)
      .withMessage('A pasta não existe!'),
  ],
  getNotesInFolder: [
    check('folderId')
      .notEmpty()
      .withMessage('O parâmetro folderId é obrigatório.'),
    check('folderId')
      .custom(_checkFolderExist)
      .withMessage('A pasta não existe!'),
  ],
  delete: [
    check('noteId').notEmpty().withMessage('O parâmetro noteId é obrigatório.'),
    check('noteId').custom(_checkNoteExist).withMessage('A nota não existe!'),
  ],
};
