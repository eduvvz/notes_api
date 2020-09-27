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

  async getByUser(userId) {
    try {
      const notes = await Folder.findAndCountAll({
        where: { userId },
        order: [['updatedAt', 'DESC']],
      });

      return notes;
    } catch (error) {
      return error;
    }
  }
}

export default new FolderRepository();
