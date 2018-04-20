import * as sqlManager from '../../lib/sql-manager';
import { Trainer } from '../trainers/trainer-manager';

import Sequelize from 'sequelize';

const Client = sqlManager.define('client', {
  name: Sequelize.STRING,
  balance: Sequelize.INTEGER,
  trainerId: {
    type: Sequelize.STRING,
    references: {
      model: Trainer,
      key: '_id',
    }
  }
});

async function updateBalance(id, amount) {
  return await Client.increment({ balance: amount }, { where: { _id: id } });
}

export default {
  Client,
  updateBalance,
  ...sqlManager
};
