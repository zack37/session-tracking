import * as sqlManager from '../../lib/sql-manager';
import Sequelize from 'sequelize';

const Trainer = sqlManager.define('trainer', {
  email: Sequelize.STRING,
  name: Sequelize.STRING,
});

export default {
  Trainer,
};
