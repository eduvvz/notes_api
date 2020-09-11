import User from '../models/Users';

class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;
    // console.log({ name, email, password });
    const user = await User.create({ name, email, password });

    return res.json(user);
  }
}

export default new UserController();
