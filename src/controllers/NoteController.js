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
      const { userId, offset, limit } = req.query;

      try {
        const notes = await NoteRepository.getByUser(userId, limit, offset);
        return res.status(200).json({
          data: notes,
          msg: 'Notas encontradas.',
        });
      } catch (error) {
        return handleDefaultError(error, res);
      }
    },
  },

  getByUserAndWithoutFolder: {
    validations: NoteValidations.getByUserAndWithoutFolder,
    handler: async (req, res) => {
      const { userId, offset, limit } = req.query;

      const notes = await NoteRepository.getByUserAndWithoutFolder(
        userId,
        limit,
        offset
      );

      return res.status(200).json({
        data: notes,
        msg: 'Notas encontradas!',
      });
    },
  },

  putNoteInFolder: {
    validations: NoteValidations.putNoteInFolder,
    handler: async (req, res) => {
      const { noteId, folderId } = req.body;

      const note = await NoteRepository.putNoteInFolder(noteId, folderId);

      return res.status(200).json({
        data: note,
        msg: 'Nota colocada numa pasta!',
      });
    },
  },

  getNotesInFolder: {
    validations: NoteValidations.getNotesInFolder,
    handler: async (req, res) => {
      const { folderId } = req.query;

      const notes = await NoteRepository.getNotesInFolder(folderId);

      return res.status(200).json({
        data: notes,
        msg: 'Notas encontradas!',
      });
    },
  },

  delete: {
    validations: NoteValidations.delete,
    handler: async (req, res) => {
      const { noteId } = req.query;

      try {
        const note = await NoteRepository.delete(noteId);

        return res.status(200).json({
          data: note,
          msg: 'Nota deletada.',
        });
      } catch (error) {
        return handleDefaultError(error, res);
      }
    },
  },

  getDeleted: {
    validations: NoteValidations.getDeleted,
    handler: async (req, res) => {
      const { userId } = req.query;

      const notes = await NoteRepository.getDeletedByUser(userId);

      return res.status(200).json({
        data: notes,
        msg: 'Notas encontradas!',
      });
    },
  },
};

export default NoteController;
