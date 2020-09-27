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
        console.log(folder);
        return res.status(201).json({
          data: folder,
          msg: 'Pasta criada!',
        });
      } catch (error) {
        return handleDefaultError(error, res);
      }
    },
  },
};

export default NoteController;
