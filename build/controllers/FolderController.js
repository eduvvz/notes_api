"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _FolderValidatons = require('./validators/FolderValidatons'); var _FolderValidatons2 = _interopRequireDefault(_FolderValidatons);
var _FolderRepository = require('../repository/FolderRepository'); var _FolderRepository2 = _interopRequireDefault(_FolderRepository);
var _handleErrors = require('../utils/handleErrors');

const NoteController = {
  store: {
    validations: _FolderValidatons2.default.store,
    handler: async (req, res) => {
      const { name, userId } = req.body;

      try {
        const folder = await _FolderRepository2.default.store({
          name,
          userId,
        });

        return res.status(201).json({
          data: folder,
          msg: 'Pasta criada!',
        });
      } catch (error) {
        return _handleErrors.handleDefaultError.call(void 0, error, res);
      }
    },
  },

  getByUser: {
    validations: _FolderValidatons2.default.getByUser,
    handler: async (req, res) => {
      const { userId, offset, limit } = req.query;

      try {
        const notes = await _FolderRepository2.default.getByUser(userId, limit, offset);
        return res.status(200).json({
          data: notes,
          msg: 'Pastas encontradas.',
        });
      } catch (error) {
        return _handleErrors.handleDefaultError.call(void 0, error, res);
      }
    },
  },
};

exports. default = NoteController;
