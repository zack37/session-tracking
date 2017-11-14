import * as sqlManager from '../../../lib/sql-manager';

import { Client } from '../client-manager';
import Sequelize from 'sequelize';

const Payment = sqlManager.define('payment', {
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

Payment.sync();

export default {
  ...sqlManager,
  Payment,
};
