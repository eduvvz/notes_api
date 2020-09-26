import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

class Folder extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
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
    this.belongsTo(models.Folder, { foreignKey: 'folderId', as: 'folder' });
  }
}

export default Folder;