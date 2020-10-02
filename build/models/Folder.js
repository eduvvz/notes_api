"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _uuid = require('uuid');

class Folder extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize.DataTypes.STRING,
        userId: _sequelize.DataTypes.UUID,
      },
      {
        sequelize,
      }
    );

    this.beforeSave((note) => {
      note.id = _uuid.v4.call(void 0, );
      return note;
    });
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
    this.hasMany(models.Note, { foreignKey: 'folderId', as: 'notes' });
  }
}

exports. default = Folder;
