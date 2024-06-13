import { Sequelize } from 'sequelize';

const db = new Sequelize('ks_spotseeker', 'postgres', 'Kronos86', {
  host: 'localhost',
  dialect: 'postgres',
});

export default db;
