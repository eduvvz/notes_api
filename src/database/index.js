import { Sequelize } from 'sequelize';
import dbConfig from '../config/database';
import User from '../models/Users';
import Note from '../models/Note';
import Folder from '../models/Folder';

const sequelize = new Sequelize(dbConfig);

User.init(sequelize);
Note.init(sequelize);
Folder.init(sequelize);

Note.associate(sequelize.models);

export default sequelize;
