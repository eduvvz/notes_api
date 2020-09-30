import Note from '../models/Note';
import { Op } from 'sequelize';

class NoteRepository {
  async store(note) {
    return new Promise((resolve, reject) => {
      Note.create(note)
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
      Note.findByPk(id)
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
      Note.findAndCountAll({
        where: { userId },
        order: [['updatedAt', 'DESC']],
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
      Note.findAndCountAll({
        where: { userId, folderId: null, deleteAt: null },
        order: [['updatedAt', 'DESC']],
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
      Note.findByPk(noteId)
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
      Note.findAll({ where: { folderId, deleteAt: null } })
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
      Note.findByPk(noteId)
        .then((note) => {
          note.deleteAt = new Date();

          note.save();

          resolve(note);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getDeletedByUser(userId) {
    return new Promise((resolve, reject) => {
      Note.findAndCountAll({
        where: {
          userId,
          deleteAt: {
            [Op.ne]: null,
          },
        },
      })
        .then((notes) => {
          resolve(notes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default new NoteRepository();
