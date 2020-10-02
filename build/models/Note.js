"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _uuid = require('uuid');

class Note extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        title: _sequelize.DataTypes.STRING,
        userId: _sequelize.DataTypes.UUID,
        folderId: _sequelize.DataTypes.UUID,
        content: _sequelize.DataTypes.TEXT,
        color: _sequelize.DataTypes.STRING,
        deleteAt: _sequelize.DataTypes.DATE,
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
    this.belongsTo(models.Folder, { foreignKey: 'folderId', as: 'folder' });
  }
}

exports. default = Note;
