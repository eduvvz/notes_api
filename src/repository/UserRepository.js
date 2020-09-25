import Users from '../models/Users';
import { handleDefaultError } from '../utils/handleErrors';

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

  async checkEmailExists(req, res) {
    const { email } = req.query;

    try {
      const user = await _getByEmail(email);

      res.status(200).json({
        data: { exist: Boolean(user) },
        msg: user ? 'E-mail existe!' : 'E-mail não existe',
      });
    } catch (error) {
      return handleDefaultError(error, res);
    }
  }

  async getById(id, callback) {
    const user = await Users.findByPk(id);
    callback(user);

    return user;
  }
}

async function _getByEmail(email) {
  const user = await Users.findOne({
    where: { email },
  });

  return user;
}

export default new UserRepository();
