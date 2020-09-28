import Folder from '../models/Folder';

class FolderRepository {
  async store(folder) {
    return new Promise((resolve, reject) => {
      Folder.create(folder)
        .then((folder) => {
          resolve(folder);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getById(id, callback) {
    return new Promise((resolve, reject) => {
      Folder.findByPk(id)
        .then((folder) => {
          callback(callback);
          resolve(folder);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getByUser(userId) {
    return new Promise((resolve, reject) => {
      Folder.findAndCountAll({
        where: { userId },
        order: [['updatedAt', 'DESC']],
      })
        .then((folders) => {
          resolve(folders);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default new FolderRepository();
