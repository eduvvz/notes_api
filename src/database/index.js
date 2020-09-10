import { Sequelize } from 'sequelize';
import dbConfig from '../config/database';
import User from '../models/Users';

const sequelize = new Sequelize(dbConfig);

User.init(sequelize);

export default sequelize;
