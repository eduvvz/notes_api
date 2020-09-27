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

  async getById(id, callback) {
    try {
      const folder = await Folder.findByPk(id);
      callback(folder);
      return folder;
    } catch (error) {
      return error;
    }
  }

  async getByUser(userId) {
    try {
      const folders = await Folder.findAndCountAll({
        where: { userId },
        order: [['updatedAt', 'DESC']],
      });

      return folders;
    } catch (error) {
      return error;
    }
  }
}

export default new FolderRepository();
