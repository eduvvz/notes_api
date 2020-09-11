'use strict';
import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

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
      return (user.id = uuidv4());
    });
  }
}

export default Users;
