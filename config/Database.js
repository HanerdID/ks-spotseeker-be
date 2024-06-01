import { Sequelize } from 'sequelize';

const db = new Sequelize('ks_spotseeker', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
