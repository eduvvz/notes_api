import NoteValidations from './validators/NoteValidations';
import NoteRepository from '../repository/NoteRepository';

const NoteController = {
  store: {
    validations: NoteValidations.store,
    handler: NoteRepository.store,
  },
};

export default NoteController;
