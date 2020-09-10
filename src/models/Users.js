'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Users extends Model {
    static associate() {}
  }
  Users.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
