import Users from '../models/Users';

class UserRepository {
  async store(user) {
    return new Promise((resolve, reject) => {
      Users.create(user)
        .then((newUser) => {
          resolve(newUser);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getByEmail(email, callback = () => null) {
    return new Promise((resolve, reject) => {
      Users.findOne({
        where: { email },
      })
        .then((user) => {
          callback(user);
          resolve(user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getById(id, callback) {
    return new Promise((resolve, reject) => {
      Users.findByPk(id)
        .then((user) => {
          callback(user);
          resolve(user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default new UserRepository();
