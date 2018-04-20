import * as sqlManager from '../../lib/sql-manager';
import Sequelize from 'sequelize';

const Auth = sqlManager.define('auth', {
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  dateCreated: Sequelize.DATEONLY,
});

async function insert(authObj) {
  const record = { ...authObj, dateCreated: new Date() };

  return await sqlManager.insert(Auth, record);
}

async function findByEmail(email) {
  return await sqlManager.find(Auth, { email });
}

export default {
  ...sqlManager,
  Auth,
  insert,
  findByEmail
};
