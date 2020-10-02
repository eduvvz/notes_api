"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict';
var _sequelize = require('sequelize');
var _uuid = require('uuid');
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);

class Users extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize.DataTypes.STRING,
        email: _sequelize.DataTypes.STRING,
        password: _sequelize.DataTypes.TEXT,
      },
      {
        sequelize,
      }
    );

    this.beforeSave((user) => {
      const saltRounds = _bcrypt2.default.genSaltSync(process.env.SALT);
      user.password = _bcrypt2.default.hashSync(user.password, saltRounds);
      user.id = _uuid.v4.call(void 0, );
      return user;
    });
  }
}

exports. default = Users;
