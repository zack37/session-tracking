import * as baseManager from '../../lib/sql-manager';
import sql from 'sql-query';

const sqlQuery = sql.Query('postgresql');

export const getAll = baseManager.getAll('clients');
export const getById = baseManager.getById('clients');
export const create = baseManager.create('clients');
export const update = baseManager.update('clients');
export const getPayments = baseManager.getAll('payments');
export const logPayment = baseManager.create('payments');
export const getSessions = baseManager.getAll('sessions');
export const logSession = baseManager.create('sessions');

export const getByTrainerId = trainerId => getAll({ trainerId });
export const assignTrainer = ({ trainerId, clientId }) =>
  update({ trainerId }, { id: clientId });
