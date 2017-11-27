import * as sqlManager from '../../lib/sql-manager';

import { Client } from '../clients/client-manager';
import Sequelize from 'sequelize';

const Session = sqlManager.define('session', {
  date: Sequelize.DATEONLY,
  amount: Sequelize.INTEGER(5),
  clientId: {
    type: Sequelize.STRING,
    references: {
      model: Client,
      key: '_id',
    },
  },
});

export default {
  ...sqlManager,
  Session,
};
