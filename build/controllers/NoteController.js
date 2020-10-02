"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _NoteValidations = require('./validators/NoteValidations'); var _NoteValidations2 = _interopRequireDefault(_NoteValidations);
var _NoteRepository = require('../repository/NoteRepository'); var _NoteRepository2 = _interopRequireDefault(_NoteRepository);
var _handleErrors = require('../utils/handleErrors');

const NoteController = {
  store: {
    validations: _NoteValidations2.default.store,
    handler: async (req, res) => {
      const { title, userId, content, color } = req.body;

      try {
        const note = await _NoteRepository2.default.store({
          title,
          userId,
          content,
          color,
        });
        return res.status(201).json({
          data: note,
          msg: 'Nota criada!',
        });
      } catch (error) {
        return _handleErrors.handleDefaultError.call(void 0, error, res);
      }
    },
  },

  getByUser: {
    validations: _NoteValidations2.default.getByUser,
    handler: async (req, res) => {
      const { userId, offset, limit } = req.query;

      try {
        const notes = await _NoteRepository2.default.getByUser(userId, limit, offset);
        return res.status(200).json({
          data: notes,
          msg: 'Notas encontradas.',
        });
      } catch (error) {
        return _handleErrors.handleDefaultError.call(void 0, error, res);
      }
    },
  },

  getByUserAndWithoutFolder: {
    validations: _NoteValidations2.default.getByUserAndWithoutFolder,
    handler: async (req, res) => {
      const { userId, offset, limit } = req.query;

      const notes = await _NoteRepository2.default.getByUserAndWithoutFolder(
        userId,
        limit,
        offset
      );

      return res.status(200).json({
        data: notes,
        msg: 'Notas encontradas!',
      });
    },
  },

  putNoteInFolder: {
    validations: _NoteValidations2.default.putNoteInFolder,
    handler: async (req, res) => {
      const { noteId, folderId } = req.body;

      const note = await _NoteRepository2.default.putNoteInFolder(noteId, folderId);

      return res.status(200).json({
        data: note,
        msg: 'Nota colocada numa pasta!',
      });
    },
  },

  getNotesInFolder: {
    validations: _NoteValidations2.default.getNotesInFolder,
    handler: async (req, res) => {
      const { folderId } = req.query;

      const notes = await _NoteRepository2.default.getNotesInFolder(folderId);

      return res.status(200).json({
        data: notes,
        msg: 'Notas encontradas!',
      });
    },
  },

  delete: {
    validations: _NoteValidations2.default.delete,
    handler: async (req, res) => {
      const { noteId } = req.query;

      try {
        const note = await _NoteRepository2.default.delete(noteId);

        return res.status(200).json({
          data: note,
          msg: 'Nota deletada.',
        });
      } catch (error) {
        return _handleErrors.handleDefaultError.call(void 0, error, res);
      }
    },
  },

  restore: {
    validations: _NoteValidations2.default.restore,
    handler: async (req, res) => {
      const { noteId } = req.body;

      try {
        const note = await _NoteRepository2.default.restoreNote(noteId);

        return res.status(200).json({
          data: note,
          msg: 'Nota restaurada.',
        });
      } catch (error) {
        return _handleErrors.handleDefaultError.call(void 0, error, res);
      }
    },
  },

  deletePermanently: {
    validations: _NoteValidations2.default.delete,
    handler: async (req, res) => {
      const { noteId } = req.query;

      try {
        const note = await _NoteRepository2.default.deletePermanently(noteId);

        return res.status(200).json({
          data: note,
          msg: 'Nota deletada permanentemente.',
        });
      } catch (error) {
        return _handleErrors.handleDefaultError.call(void 0, error, res);
      }
    },
  },

  getDeleted: {
    validations: _NoteValidations2.default.getDeleted,
    handler: async (req, res) => {
      const { userId } = req.query;

      const notes = await _NoteRepository2.default.getDeletedByUser(userId);

      return res.status(200).json({
        data: notes,
        msg: 'Notas encontradas!',
      });
    },
  },
};

exports. default = NoteController;
