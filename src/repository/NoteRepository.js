import Note from '../models/Note';
import { handleDefaultError } from '../utils/handleErrors';

class NoteRepository {
  async store(req, res) {
    const { title, userId, content, color } = req.body;

    try {
      const note = await Note.create({ title, userId, content, color });
      return res.status(201).json({
        data: note,
        msg: 'Nota criada!',
      });
    } catch (error) {
      return handleDefaultError(error, res);
    }
  }
}

export default new NoteRepository();
