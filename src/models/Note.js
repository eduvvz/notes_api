import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

class Note extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        userId: DataTypes.UUID,
        content: DataTypes.TEXT,
        color: DataTypes.STRING,
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
  }
}

export default Note;
