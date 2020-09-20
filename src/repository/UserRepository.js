import Users from '../models/Users';

class UserRepository {
  async store(req, res) {
    const { name, email, password } = req.body;
    try {
      const user = await Users.create({ name, email, password });
      return res.status(201).json({
        data: user,
        msg: 'Usuário criado!',
      });
    } catch (error) {
      return res.status(500).json({
        msg: 'Algo de errado aconteceu na criação do usuário.',
        error,
      });
    }
  }

  async getByEmail(email, callback) {
    const user = await Users.findOne({
      where: { email },
    });
    callback(user);
    return user;
  }

  async checkEmailExists(req, res) {
    const { email } = req.query;

    try {
      const user = await Users.findOne({
        where: { email },
      });

      res.status(200).json({
        data: { exist: Boolean(user) },
        msg: user ? 'E-mail existe!' : 'E-mail não existe',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: 'Algo de errado aconteceu.',
        error,
      });
    }
  }
}

export default new UserRepository();
