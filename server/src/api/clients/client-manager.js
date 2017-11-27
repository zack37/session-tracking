import * as sqlManager from '../../lib/sql-manager';

import Sequelize from 'sequelize';

const Client = sqlManager.define('client', {
  name: Sequelize.STRING,
  balance: Sequelize.DECIMAL(2),
});

async function updateBalance(id, amount) {
  return await Client.increment({ balance: amount }, { where: { _id: id } });
}

export default {
  Client,
  updateBalance,
  ...sqlManager
};
