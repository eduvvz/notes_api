import FolderValidations from './validators/FolderValidatons';
import FolderRepository from '../repository/FolderRepository';
import { handleDefaultError } from '../utils/handleErrors';

const NoteController = {
  store: {
    validations: FolderValidations.store,
    handler: async (req, res) => {
      const { name, userId } = req.body;

      try {
        const folder = await FolderRepository.store({
          name,
          userId,
        });

        return res.status(201).json({
          data: folder,
          msg: 'Pasta criada!',
        });
      } catch (error) {
        return handleDefaultError(error, res);
      }
    },
  },

  getByUser: {
    validations: FolderValidations.getByUser,
    handler: async (req, res) => {
      const { userId, offset, limit } = req.query;

      try {
        const notes = await FolderRepository.getByUser(userId, limit, offset);
        return res.status(200).json({
          data: notes,
          msg: 'Pastas encontradas.',
        });
      } catch (error) {
        return handleDefaultError(error, res);
      }
    },
  },
};

export default NoteController;
