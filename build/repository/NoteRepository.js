"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Note = require('../models/Note'); var _Note2 = _interopRequireDefault(_Note);
var _sequelize = require('sequelize');

class NoteRepository {
  async store(note) {
    return new Promise((resolve, reject) => {
      _Note2.default.create(note)
        .then((newNote) => {
          resolve(newNote);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getById(id, callback = () => null) {
    return new Promise((resolve, reject) => {
      _Note2.default.findByPk(id)
        .then((note) => {
          callback(note);
          resolve(note);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getByUser(userId) {
    return new Promise((resolve, reject) => {
      _Note2.default.findAndCountAll({
        where: { userId },
        order: [['createdAt', 'DESC']],
      })
        .then((notes) => {
          resolve(notes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getByUserAndWithoutFolder(userId) {
    return new Promise((resolve, reject) => {
      _Note2.default.findAndCountAll({
        where: { userId, folderId: null, deleteAt: null },
        order: [['createdAt', 'DESC']],
      })
        .then((notes) => {
          resolve(notes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async putNoteInFolder(noteId, folderId) {
    return new Promise((resolve, reject) => {
      _Note2.default.findByPk(noteId)
        .then(async (note) => {
          note.folderId = folderId;
          await note.save();
          resolve(note);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getNotesInFolder(folderId) {
    return new Promise((resolve, reject) => {
      _Note2.default.findAll({
        where: { folderId, deleteAt: null },
        order: [['createdAt', 'DESC']],
      })
        .then((notes) => {
          resolve(notes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async delete(noteId) {
    return new Promise((resolve, reject) => {
      _Note2.default.findByPk(noteId)
        .then(async (note) => {
          note.deleteAt = new Date();

          await note.save();

          resolve(note);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async restoreNote(noteId) {
    return new Promise((resolve, reject) => {
      _Note2.default.findByPk(noteId)
        .then(async (note) => {
          note.deleteAt = null;

          await note.save();

          resolve(note);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getDeletedByUser(userId) {
    return new Promise((resolve, reject) => {
      _Note2.default.findAndCountAll({
        where: {
          userId,
          deleteAt: {
            [_sequelize.Op.ne]: null,
          },
        },
        order: [['createdAt', 'DESC']],
      })
        .then((notes) => {
          resolve(notes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async deletePermanently(id) {
    return new Promise((resolve, reject) => {
      _Note2.default.destroy({
        where: { id },
      })
        .then(() => {
          resolve(id);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

exports. default = new NoteRepository();
