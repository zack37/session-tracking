import mongoManager from '../../lib/mongo-manager';

/**
 * Exports the base mongo manager with the `withConnection` partially applied to
 * the `clients` database
 */
export default {
  ...mongoManager,
  withConnection: mongoManager.withConnection('clients'),
};
