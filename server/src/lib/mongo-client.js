import { MongoClient } from 'mongodb';
import bluebird from 'bluebird';
import createLogger from '../logger';

const mongoUri = 'mongodb://localhost:27017/session-tracker';
const logger = createLogger('mongo-client');

export default () => {
  logger.debug('Creating new mongo connection');
  return MongoClient.connect(mongoUri, {
    promiseLibrary: bluebird,
  }).disposer(connection => {
    logger.debug('Closing mongo connection');
    return connection.close();
  });
};
