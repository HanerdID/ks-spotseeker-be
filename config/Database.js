import { Sequelize } from 'sequelize';

const db = new Sequelize('ks_spotseeker', 'root', '', {
  host: 'localhost',
  port: 3300,
  dialect: 'mysql',
});

export default db;
