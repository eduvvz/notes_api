import Folder from '../models/Folder';

class FolderRepository {
  async store(folder) {
    try {
      const newFolder = await Folder.create(folder);
      return newFolder;
    } catch (error) {
      return error;
    }
  }
}

export default new FolderRepository();
