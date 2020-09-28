import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

class Note extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        userId: DataTypes.UUID,
        folderId: DataTypes.UUID,
        content: DataTypes.TEXT,
        color: DataTypes.STRING,
        deleteAt: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    this.beforeSave((note) => {
      note.id = uuidv4();
      return note;
    });
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
    this.belongsTo(models.Folder, { foreignKey: 'folderId', as: 'folder' });
  }
}

export default Note;
