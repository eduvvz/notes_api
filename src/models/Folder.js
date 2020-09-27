import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

class Folder extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        userId: DataTypes.UUID,
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
    this.belongsTo(models.Folder, { foreignKey: 'userId', as: 'user' });
  }
}

export default Folder;
