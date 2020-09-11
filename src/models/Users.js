'use strict';
import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.TEXT,
      },
      {
        sequelize,
      }
    );

    this.beforeSave((user) => {
      const saltRounds = bcrypt.genSaltSync(process.env.SALT);
      user.password = bcrypt.hashSync(user.password, saltRounds);
      user.id = uuidv4();
      return user;
    });
  }
}

export default Users;
