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

  async getByUser(userId) {
    try {
      const notes = await Note.findAndCountAll({
        where: { userId },
        order: [['updatedAt', 'DESC']],
      });
      console.log(notes);
      return notes;
    } catch (error) {
      return error;
    }
  }
}

export default new NoteRepository();
