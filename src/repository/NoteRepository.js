import Note from '../models/Note';

class NoteRepository {
  async store(note) {
    try {
      const newNote = await Note.create(note);
      return newNote;
    } catch (error) {
      return error;
    }
  }

  async getById(id, callback = () => null) {
    try {
      const note = await Note.findByPk(id);
      callback(note);
      return note;
    } catch (error) {
      return error;
    }
  }

  async getByUser(userId) {
    try {
      const notes = await Note.findAndCountAll({
        where: { userId },
        order: [['updatedAt', 'DESC']],
      });

      return notes;
    } catch (error) {
      return error;
    }
  }

  async getByUserAndWithoutFolder(userId) {
    try {
      const notes = await Note.findAndCountAll({
        where: { userId, folderId: null, deleteAt: null },
        order: [['updatedAt', 'DESC']],
      });

      return notes;
    } catch (error) {
      return error;
    }
  }

  async putNoteInFolder(noteId, folderId) {
    try {
      const note = await Note.findByPk(noteId);

      note.folderId = folderId;
      await note.save();

      return note;
    } catch (error) {
      return error;
    }
  }

  async getNotesInFolder(folderId) {
    try {
      const notes = await Note.findAll({ where: { folderId, deleteAt: null } });

      return notes;
    } catch (error) {
      return error;
    }
  }

  async delete(noteId) {
    try {
      const note = await Note.findByPk(noteId);

      note.deleteAt = new Date();
      await note.save();

      return note;
    } catch (error) {
      return error;
    }
  }
}

export default new NoteRepository();
