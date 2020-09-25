import Users from '../models/Users';

class UserRepository {
  async store(user, callback = () => null) {
    try {
      const newUser = await Users.create(user);
      callback();
      return newUser;
    } catch (error) {
      return error;
    }
  }

  async getByEmail(email, callback = () => null) {
    const user = await Users.findOne({
      where: { email },
    });
    callback(user);

    return user;
  }

  async getById(id, callback) {
    const user = await Users.findByPk(id);
    callback(user);

    return user;
  }
}

export default new UserRepository();
