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
      Note.findAndCountAll({
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
      Note.findAll({
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
      Note.findByPk(noteId)
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
      Note.findByPk(noteId)
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
      Note.findAndCountAll({
        where: {
          userId,
          deleteAt: {
            [Op.ne]: null,
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
      Note.destroy({
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

export default new NoteRepository();
