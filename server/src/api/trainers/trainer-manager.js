import * as baseManager from '../../lib/sql-manager';

export default {
  getAll: baseManager.getAll('trainers'),
  getById: baseManager.getById('trainers'),
  findOne: baseManager.findOne('trainers'),
  create: baseManager.create('trainers'),
};
