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
}

export default new NoteRepository();
