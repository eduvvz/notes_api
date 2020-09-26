import NoteValidations from './validators/NoteValidations';
import NoteRepository from '../repository/NoteRepository';
import { handleDefaultError } from '../utils/handleErrors';

const NoteController = {
  store: {
    validations: NoteValidations.store,
    handler: async (req, res) => {
      const { title, userId, content, color } = req.body;

      try {
        const note = await NoteRepository.store({
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
        return handleDefaultError(error, res);
      }
    },
  },

  getByUser: {
    validations: NoteValidations.getByUser,
    handler: async (req, res) => {
      const { userId } = req.query;

      try {
        const notes = await NoteRepository.getByUser(userId);
        return res.status(200).json({
          data: notes,
          msg: 'Notas encontradas.',
        });
      } catch (error) {
        return handleDefaultError(error, res);
      }
    },
  },
};

export default NoteController;
