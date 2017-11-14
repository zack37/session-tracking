import * as sqlManager from '../../../lib/sql-manager';

import { Client } from '../client-manager';
import Sequelize from 'sequelize';

const Session = sqlManager.define('session', {
  date: Sequelize.DATEONLY,
  amount: Sequelize.FLOAT(10, 2),
  clientId: {
    type: Sequelize.STRING,
    references: {
      model: Client,
      key: '_id',
    },
  },
});

Session.sync();

export default {
  ...sqlManager,
  Session,
};
